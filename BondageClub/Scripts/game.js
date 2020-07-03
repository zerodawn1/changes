class Game{
	constructor(){
		if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
//1
		this.modes = Object.freeze({
			NONE:   Symbol("none"),
			PRELOAD: Symbol("preload"),
			INITIALISING:  Symbol("initialising"),
			CREATING_LEVEL: Symbol("creating_level"),
			ACTIVE: Symbol("active"),
			GAMEOVER: Symbol("gameover")
		});
		this.mode = this.modes.NONE;

		this.container;
		this.player = { };
		this.stats;
		this.controls;
		this.camera;
		this.scene;
		this.renderer;
		this.cellSize = 16;
		this.interactive = false;
		this.levelIndex = 0;
		this._hints = 0;
		this.score = 0;
		this.debug = false;
		this.debugPhysics = false;
		this.cameraFade = 0.05;


		this.container = document.createElement( 'div' );
		this.container.style.height = '100%';
		document.body.appendChild( this.container );


		const game = this;
		this.anims = ["look-around"];

		this.animmaid = ["greet-maid"]

		this.assetsPath = '../assets/';

		const options = {
			assets:[
				`${this.assetsPath}fbx/env1.fbx`
			],
			oncomplete: function(){
				game.init();
				game.animate();
			}
		}

		this.anims.forEach( function(anim){ options.assets.push(`${game.assetsPath}fbx/${anim}.fbx`)});
		this.animmaid.forEach( function(animaid){ options.assets.push(`${game.assetsPath}fbx/${animaid}.fbx`)});

		this.mode = this.modes.PRELOAD;

		document.getElementById("camera-btn").onclick = function(){ game.switchCamera(); };
		document.getElementById("briefcase-btn").onclick = function(){ game.toggleBriefcase(); };

		this.clock = new THREE.Clock();
		//this.init();
		//this.animate();
		const preloader = new Preloader(options);
	}

	toggleBriefcase(){
			const briefcase = document.getElementById("briefcase");
			const open = (briefcase.style.opacity > 0);

			if (open){
					briefcase.style.opacity = "0";
			}else{
					briefcase.style.opacity = "1";
			}
	}
	switchCamera(fade=0.05){
		const cams = Object.keys(this.player.cameras);
		cams.splice(cams.indexOf('active'), 1);
		let index;
		for(let prop in this.player.cameras){
			if (this.player.cameras[prop]==this.player.cameras.active){
				index = cams.indexOf(prop) + 1;
				if (index>=cams.length) index = 0;
				this.player.cameras.active = this.player.cameras[cams[index]];
				break;
			}
		}
		this.cameraFade = fade;
	}

	set activeCamera(object){
		this.player.cameras.active = object;
	}

	init() {
		this.mode = this.modes.INITIALISING;

		this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );

		let col = 0x605050;
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color( col );
		this.scene.fog = new THREE.Fog( col, 500, 1500 );

		let light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
		light.position.set( 30, 2000, 0 );
		this.scene.add( light );

		light = new THREE.DirectionalLight( 0xffffff );
		light.position.set( 0, 2000, 100 );
		light.castShadow = true;
		light.shadow.mapSize.width = 2048;
		light.shadow.mapSize.height = 2048;
		light.shadow.camera.top = 3000;
		light.shadow.camera.bottom = -3000;
		light.shadow.camera.left = -3000;
		light.shadow.camera.right = 3000;
		light.shadow.camera.far = 3000;
		this.scene.add( light );


		// model
		const loader = new THREE.FBXLoader();
		const game = this;

		loader.load( `${this.assetsPath}fbx/girl-walk.fbx`, function ( object ) {

			object.mixer = new THREE.AnimationMixer( object );
			object.castShadow = true;

			game.player.mixer = object.mixer;
			game.player.root = object.mixer.getRoot();

			object.name = "Character";

			object.traverse( function ( child ) {
				if ( child.isMesh ) {
					child.castShadow = true;
					child.receiveShadow = true;
				}
			} );


			game.scene.add(object);
			game.player.object = object;
			game.player.walk = object.animations[0];

			game.joystick = new JoyStick({
				onMove: game.playerControl,
				game: game
			});

			game.createCameras();
			game.loadEnvironment(loader);
			game.newgirls(loader)
		} );



		this.renderer = new THREE.WebGLRenderer( { antialias: true } );
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
		this.renderer.shadowMapDebug = true;
		this.container.appendChild( this.renderer.domElement );

		window.addEventListener( 'resize', function(){ game.onWindowResize(); }, false );

		// stats
		if (this.debug){
			this.stats = new Stats();
			this.container.appendChild( this.stats.dom );
		}
	}
	newgirls(loader){
		const game = this;
		for (let x = 1 ; x < 10; x++){
			loader.load( `${this.assetsPath}fbx/maid1.fbx`, function(object){
				game.scene.add(object);


				object.mixer = new THREE.AnimationMixer( object );
				object.castShadow = true;

				object.position.set(x*50+3, 0, 0);


				game.maid.mixer = object.mixer;
				game.maid.root = object.mixer.getRoot();


				const anim = this.maid[name];
				const action = this.maid.mixer.clipAction( ani,  this.maid.root );
				action.play();




			object.traverse( function ( child ) {
				if ( child.isMesh ) {
					child.castShadow = true;
					child.receiveShadow = true;
				}
			} );
			// game.maid.walk = object.animations[0];

		});
	}
}

	loadEnvironment(loader){
		const game = this;

		loader.load( `${this.assetsPath}fbx/env1.fbx`, function ( object ) {
			game.scene.add(object);

			object.receiveShadow = true;
			object.scale.set(0.8, 0.8, 0.8);
			object.name = "Environment";

			object.traverse( function ( child ) {
				if ( child.isMesh ) {
					if (child.name.includes('main')){
						child.castShadow = true;
						child.receiveShadow = true;
					}else if (child.name.includes('proxy')){
						child.material.visible = true;
					}

				}
			} );

			game.loadNextAnim(loader);
		  game.loadnextanimmaid(loader)
		} );
	}

	createDummyEnvironment(){
		const env = new THREE.Group();
		env.name = "Environment";
		this.scene.add(env);

		const geometry = new THREE.BoxBufferGeometry( 150, 150, 150 );
		const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );

		for(let x=-1000; x<1000; x+=300){
			for(let z=-1000; z<1000; z+=300){
				const block = new THREE.Mesh(geometry, material);
				block.position.set(x, 75, z);
				env.add(block);
			}
		}

		this.environmentProxy = env;
	}

	playerControl(forward, turn){
		turn = -turn;

		if (forward==0 && turn==0){

			delete this.player.move;
		}else{
			this.player.move = { forward, turn };
		}

		if (forward>0){
			if (this.player.action!='walk') this.action = 'walk';
		}else if (forward<-0.2){
			if (this.player.action!='walk') this.action = 'walk';
		}else{
			if (this.player.action=="walk") this.action = 'look-around';
		}

	}

	createCameras(){
		const front = new THREE.Object3D();
		front.position.set(112, 100, 200);
		front.parent = this.player.object;
		const back = new THREE.Object3D();
		back.position.set(100, 140, -300);
		back.parent = this.player.object;
		const wide = new THREE.Object3D();
		wide.position.set(178, 139, 365);
		wide.parent = this.player.object;
		const overhead = new THREE.Object3D();
		overhead.position.set(0, 400, 0);
		overhead.parent = this.player.object;
		const collect = new THREE.Object3D();
		collect.position.set(40, 82, 94);
		collect.parent = this.player.object;
		this.player.cameras = { front, back, wide, overhead, collect };
		game.activeCamera = this.player.cameras.wide;
		game.cameraFade = 1;
		setTimeout( function(){
			game.activeCamera = game.player.cameras.back;
			game.cameraFade = 0.1;
			setTimeout(function(){ game.cameraFade = 0.1; }, 1500);
		}, 2000)
	}

	loadnextanimmaid(loader){
		let animaid = this.animmaid.pop()
		const game = this;
		loader.load( `${this.assetsPath}fbx/${animaid}.fbx`, function (object){
				game.maid[animaid] = object.animation[0];
				if (game.animmaid.length > 0){
					game.loadnextanimmaid(loader);
				}else{
					delete game.animMaid;
					game.action = "greet-maid";

				}
		})
	}
	loadNextAnim(loader){
		let anim = this.anims.pop();
		const game = this;
		loader.load( `${this.assetsPath}fbx/${anim}.fbx`, function( object ){
			game.player[anim] = object.animations[0];
			if (game.anims.length>0){
				game.loadNextAnim(loader);
			}else{
				delete game.anims;
				game.action = "look-around";
				game.mode = game.modes.ACTIVE;
				const overlay = document.getElementById("overlay");
    			overlay.classList.add("fade-in");
				overlay.addEventListener("animationend", function(evt){
					evt.target.style.display = 'none';
				}, false);
			}
		});
	}

	getMousePosition(clientX, clientY){
		const pos = new THREE.Vector2();
		pos.x = (clientX / this.renderer.domElement.clientWidth) * 2 - 1;
		pos.y = -(clientY / this.renderer.domElement.clientHeight) * 2 + 1;
		return pos;
	}

	showMessage(msg, fontSize=20, onOK=null){
		const txt = document.getElementById('message_text');
		txt.innerHTML = msg;
		txt.style.fontSize = fontSize + 'px';
		const btn = document.getElementById('message_ok');
		const panel = document.getElementById('message');
		const game = this;
		if (onOK!=null){
			btn.onclick = function(){
				panel.style.display = 'none';
				onOK.call(game);
			}
		}else{
			btn.onclick = function(){
				panel.style.display = 'none';
			}
		}
		panel.style.display = 'flex';
	}

	loadJSON(name, callback) {

		var xobj = new XMLHttpRequest();
			xobj.overrideMimeType("application/json");
		xobj.open('GET', `${name}.json`, true);
		xobj.onreadystatechange = function () {
			  if (xobj.readyState == 4 && xobj.status == "200") {
				callback(xobj.responseText);
			  }
		};
		xobj.send(null);
	 }

	onWindowResize() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize( window.innerWidth, window.innerHeight );

	}

	set action(name){
		const anim = this.player[name];
		const action = this.player.mixer.clipAction( anim,  this.player.root );
		this.player.mixer.stopAllAction();
		this.player.action = name;
		action.timeScale = (name=='walk' && this.player.move!=undefined && this.player.move.forward<0) ? -0.3 : 1;
		action.fadeIn(0.5);
		action.play();
	}

	movePlayer(dt){
		const pos = this.player.object.position.clone();
		pos.y += 60;
		let dir = new THREE.Vector3();
		this.player.object.getWorldDirection(dir);
		if (this.player.move.forward<0) dir.negate();
		let raycaster = new THREE.Raycaster(pos, dir);
		let blocked = false;
		const box = this.environmentProxy;

		if (this.environmentProxy!=undefined){
			const intersect = raycaster.intersectObject(box);
			if (intersect.length>0){
				if (intersect[0].distance<50) blocked = true;
			}
		}

		if (!blocked){
			if (this.player.move.forward>0){
				this.player.object.translateZ(dt*100);
			}else{
				this.player.object.translateZ(-dt*30);
			}
		}

		if (this.environmentProxy!=undefined){
			//cast left
			dir.set(-1,0,0);
			dir.applyMatrix4(this.player.object.matrix);
			dir.normalize();
			raycaster = new THREE.Raycaster(pos, dir);

			let intersect = raycaster.intersectObject(box);
			if (intersect.length>0){
				if (intersect[0].distance<50) this.player.object.translateX(50-intersect[0].distance);
			}

			//cast right
			dir.set(1,0,0);
			dir.applyMatrix4(this.player.object.matrix);
			dir.normalize();
			raycaster = new THREE.Raycaster(pos, dir);

			intersect = raycaster.intersectObject(box);
			if (intersect.length>0){
				if (intersect[0].distance<50) this.player.object.translateX(intersect[0].distance-50);
			}

			//cast down
			dir.set(0,-1,0);
			pos.y += 200;
			raycaster = new THREE.Raycaster(pos, dir);
			const gravity = 30;

			intersect = raycaster.intersectObject(box);
			if (intersect.length>0){
				const targetY = pos.y - intersect[0].distance;
				if (targetY > this.player.object.position.y){
					//Going up
					this.player.object.position.y = 0.8 * this.player.object.position.y + 0.2 * targetY;
					this.player.velocityY = 0;
				}else if (targetY < this.player.object.position.y){
					//Falling
					if (this.player.velocityY==undefined) this.player.velocityY = 0;
					this.player.velocityY += dt * gravity;
					this.player.object.position.y -= this.player.velocityY;
					if (this.player.object.position.y < targetY){
						this.player.velocityY = 0;
						this.player.object.position.y = targetY;
					}
				}
			}
		}
	}

	animate() {
		const game = this;
		const dt = this.clock.getDelta();

		requestAnimationFrame( function(){ game.animate(); } );

		if (this.player.mixer!=undefined && this.mode==this.modes.ACTIVE){
			this.player.mixer.update(dt);
		}

		if (this.player.move!=undefined){
			if (this.player.move.forward!=0) this.movePlayer(dt);
			this.player.object.rotateY(this.player.move.turn*dt);
		}

		if (this.player.cameras!=undefined && this.player.cameras.active!=undefined){
			this.camera.position.lerp(this.player.cameras.active.getWorldPosition(new THREE.Vector3()), this.cameraFade);
			const pos = this.player.object.position.clone();
			pos.y += 60;
			this.camera.lookAt(pos);
		}

		this.renderer.render( this.scene, this.camera );

		if (this.stats!=undefined) this.stats.update();

	}
}

class Easing{
	// t: current time, b: begInnIng value, c: change In value, d: duration
	constructor(start, end, duration, startTime=0, type='linear'){
		this.b = start;
		this.c = end - start;
		this.d = duration;
		this.type = type;
		this.startTime = startTime;
	}

	value(time){
		this.t = time - this.startTime;
		return this[this.type]();
	}

	linear(){
		return this.c*(this.t/this.d) + this.b;
	}

	inQuad() {
		return this.c*(this.t/=this.d)*this.t + this.b;
	}

	outQuad() {
		return -this.c*(this.t/=this.d)*(this.t-2) + this.b;
	}

	inOutQuad() {
		if ((this.t/=this.d/2) < 1) return this.c/2*this.t*this.t + this.b;
		return -this.c/2 * ((--this.t)*(this.t-2) - 1) + this.b;
	}

	projectile(){
		let c = this.c;
		let b = this.b;
		let t = this.t;
		this.t *= 2;
		let result;
		let func;
		if (this.t<this.d){
			result = this.outQuad();
			func = "outQuad";
		}else{
			this.t -= this.d;
			this.b += c;
			this.c = -c;
			result = this.inQuad();
			func = "inQuad";
		}
		console.log("projectile: " + result.toFixed(2) + " time:" + this.t.toFixed(2) + " func:" + func);
		this.b = b;
		this.c = c;
		this.t = t;
		return result;
	}

	inCubic() {
		return this.c*(this.t/=this.d)*this.t*this.t + this.b;
	}

	outCubic() {
		return this.c*((this.t=this.t/this.d-1)*this.t*this.t + 1) + this.b;
	}

	inOutCubic() {
		if ((this.t/=this.d/2) < 1) return this.c/2*this.t*this.t*this.t + this.b;
		return this.c/2*((this.t-=2)*this.t*this.t + 2) + this.b;
	}

	inQuart() {
		return this.c*(this.t/=this.d)*this.t*this.t*this.t + this.b;
	}

	outQuart() {
		return -this.c * ((this.t=this.t/this.d-1)*this.t*this.t*this.t - 1) + this.b;
	}

	inOutQuart() {
		if ((this.t/=this.d/2) < 1) return this.c/2*this.t*this.t*this.t*this.t + this.b;
		return -this.c/2 * ((this.t-=2)*this.t*this.t*this.t - 2) + this.b;
	}

	inQuint() {
		return this.c*(this.t/=this.d)*this.t*this.t*this.t*this.t + this.b;
	}

	outQuint() {
		return this.c*((this.t=this.t/this.d-1)*this.t*this.t*this.t*this.t + 1) + this.b;
	}

	inOutQuint() {
		if ((this.t/=this.d/2) < 1) return this.c/2*this.t*this.t*this.t*this.t*this.t + this.b;
		return this.c/2*((this.t-=2)*this.t*this.t*this.t*this.t + 2) + this.b;
	}

	inSine() {
		return -this.c * Math.cos(this.t/this.d * (Math.PI/2)) + this.c + this.b;
	}

	outSine() {
		return this.c * Math.sin(this.t/this.d * (Math.PI/2)) + this.b;
	}

	inOutSine() {
		return -this.c/2 * (Math.cos(Math.PI*this.t/this.d) - 1) + this.b;
	}

	inExpo() {
		return (this.t==0) ? this.b : this.c * Math.pow(2, 10 * (this.t/this.d - 1)) + this.b;
	}

	outExpo() {
		return (this.t==this.d) ? this.b+this.c : this.c * (-Math.pow(2, -10 * this.t/this.d) + 1) + this.b;
	}

	inOutExpo() {
		if (this.t==0) return this.b;
		if (this.t==this.d) return this.b+this.c;
		if ((this.t/=this.d/2) < 1) return this.c/2 * Math.pow(2, 10 * (this.t - 1)) + this.b;
		return this.c/2 * (-Math.pow(2, -10 * --this.t) + 2) + this.b;
	}

	inCirc() {
		return -this.c * (Math.sqrt(1 - (this.t/=this.d)*this.t) - 1) + this.b;
	}

	outCirc() {
		return this.c * Math.sqrt(1 - (this.t=this.t/this.d-1)*this.t) + this.b;
	}

	inOutCirc() {
		if ((this.t/=this.d/2) < 1) return -this.c/2 * (Math.sqrt(1 - this.t*this.t) - 1) + this.b;
		return this.c/2 * (Math.sqrt(1 - (this.t-=2)*this.t) + 1) + this.b;
	}

	inElastic() {
		let s=1.70158, p=0, a=this.c;
		if (this.t==0) return this.b;  if ((this.t/=this.d)==1) return this.b+this.c;  if (!p) p=this.d*.3;
		if (a < Math.abs(this.c)) { a=this.c; let s=p/4; }
		else{ let s = p/(2*Math.PI) * Math.asin (this.c/a) };
		return -(a*Math.pow(2,10*(this.t-=1)) * Math.sin( (this.t*this.d-s)*(2*Math.PI)/p )) + this.b;
	}

	outElastic() {
		let s=1.70158, p=0, a=this.c;
		if (this.t==0) return this.b;  if ((this.t/=this.d)==1) return this.b+this.c;  if (!p) p=this.d*.3;
		if (a < Math.abs(this.c)) { a=this.c; let s=p/4; }
		else{ let s = p/(2*Math.PI) * Math.asin (this.c/a) };
		return a*Math.pow(2,-10*this.t) * Math.sin( (this.t*this.d-s)*(2*Math.PI)/p ) + this.c + this.b;
	}

	inOutElastic() {
		let s=1.70158, p=0, a=this.c;
		if (this.t==0) return this.b;  if ((this.t/=this.d/2)==2) return this.b+this.c;  if (!p) p=this.d*(.3*1.5);
		if (a < Math.abs(this.c)) { a=this.c; let s=p/4; }
		else{ let s = p/(2*Math.PI) * Math.asin (this.c/a) };
		if (this.t < 1) return -.5*(a*Math.pow(2,10*(this.t-=1)) * Math.sin( (this.t*this.d-s)*(2*Math.PI)/p )) + this.b;
		return a*Math.pow(2,-10*(this.t-=1)) * Math.sin( (this.t*this.d-s)*(2*Math.PI)/p )*.5 + this.c + this.b;
	}

	inBack() {
		let s = 1.70158;
		return this.c*(this.t/=this.d)*this.t*((s+1)*this.t - s) + this.b;
	}

	outBack() {
		let s = 1.70158;
		return this.c*((this.t=this.t/this.d-1)*this.t*((s+1)*this.t + s) + 1) + this.b;
	}

	inOutBack() {
		let s = 1.70158;
		if ((this.t/=this.d/2) < 1) return this.c/2*(this.t*this.t*(((s*=(1.525))+1)*this.t - s)) + this.b;
		return this.c/2*((this.t-=2)*this.t*(((s*=(1.525))+1)*this.t + s) + 2) + this.b;
	}

	inBounce(t=this.t, b=this.b) {
		return this.c - this.outBounce (this.d-t, 0) + b;
	}

	outBounce(t=this.t, b=this.b) {
		if ((t/=this.d) < (1/2.75)) {
			return this.c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return this.c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return this.c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return this.c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	}

	inOutBounce() {
		if (this.t < this.d/2) return this.inBounce (this.t*2, 0) * .5 + this.b;
		return this.outBounce (this.t*2-this.d, 0) * .5 + this.c*.5 + this.b;
	}
}

class Tween{
	constructor(target, channel, endValue, duration, oncomplete, easing="inOutQuad"){
		this.target = target;
		this.channel = channel;
		this.oncomplete = oncomplete;
		this.endValue = endValue;
		this.duration = duration;
		this.currentTime = 0;
		this.finished = false;
		//constructor(start, end, duration, startTime=0, type='linear')
		this.easing = new Easing(target[channel], endValue, duration, 0, easing);
	}

	update(dt){
		if (this.finished) return;
		this.currentTime += dt;
		if (this.currentTime>=this.duration){
			this.target[this.channel] = this.endValue;
			if (this.oncomplete) this.oncomplete();
			this.finished = true;
		}else{
			this.target[this.channel] = this.easing.value(this.currentTime);
		}
	}
}

class JoyStick{
	constructor(options){
		const circle = document.createElement("div");
		circle.style.cssText = "position:absolute; bottom:35px; width:80px; height:80px; background:rgba(126, 126, 126, 0.5); border:#444 solid medium; border-radius:50%; left:50%; transform:translateX(-50%);";
		const thumb = document.createElement("div");
		thumb.style.cssText = "position: absolute; left: 20px; top: 20px; width: 40px; height: 40px; border-radius: 50%; background: #fff;";
		circle.appendChild(thumb);
		document.body.appendChild(circle);
		this.domElement = thumb;
		this.maxRadius = options.maxRadius || 40;
		this.maxRadiusSquared = this.maxRadius * this.maxRadius;
		this.onMove = options.onMove;
		this.game = options.game;
		this.origin = { left:this.domElement.offsetLeft, top:this.domElement.offsetTop };

		if (this.domElement!=undefined){
			const joystick = this;
			if ('ontouchstart' in window){
				this.domElement.addEventListener('touchstart', function(evt){ joystick.tap(evt); });
			}else{
				this.domElement.addEventListener('mousedown', function(evt){ joystick.tap(evt); });
			}
		}
	}

	getMousePosition(evt){
		let clientX = evt.targetTouches ? evt.targetTouches[0].pageX : evt.clientX;
		let clientY = evt.targetTouches ? evt.targetTouches[0].pageY : evt.clientY;
		return { x:clientX, y:clientY };
	}

	tap(evt){
		evt = evt || window.event;
		// get the mouse cursor position at startup:
		this.offset = this.getMousePosition(evt);
		const joystick = this;
		if ('ontouchstart' in window){
			document.ontouchmove = function(evt){ joystick.move(evt); };
			document.ontouchend =  function(evt){ joystick.up(evt); };
		}else{
			document.onmousemove = function(evt){ joystick.move(evt); };
			document.onmouseup = function(evt){ joystick.up(evt); };
		}
	}

	move(evt){
		evt = evt || window.event;
		const mouse = this.getMousePosition(evt);
		// calculate the new cursor position:
		let left = mouse.x - this.offset.x;
		let top = mouse.y - this.offset.y;
		//this.offset = mouse;

		const sqMag = left*left + top*top;
		if (sqMag>this.maxRadiusSquared){
			//Only use sqrt if essential
			const magnitude = Math.sqrt(sqMag);
			left /= magnitude;
			top /= magnitude;
			left *= this.maxRadius;
			top *= this.maxRadius;
		}

		// set the element's new position:
		this.domElement.style.top = `${top + this.domElement.clientHeight/2}px`;
		this.domElement.style.left = `${left + this.domElement.clientWidth/2}px`;

		const forward = -(top - this.origin.top + this.domElement.clientHeight/2)/this.maxRadius;
		const turn = (left - this.origin.left + this.domElement.clientWidth/2)/this.maxRadius;

		if (this.onMove!=undefined) this.onMove.call(this.game, forward, turn);
	}

	up(evt){
		if ('ontouchstart' in window){
			document.ontouchmove = null;
			document.touchend = null;
		}else{
			document.onmousemove = null;
			document.onmouseup = null;
		}
		this.domElement.style.top = `${this.origin.top}px`;
		this.domElement.style.left = `${this.origin.left}px`;

		this.onMove.call(this.game, 0, 0);
	}
}

class Preloader{
	constructor(options){
		this.assets = {};
		for(let asset of options.assets){
			this.assets[asset] = { loaded:0, complete:false };
			this.load(asset);
		}
		this.container = options.container;

		if (options.onprogress==undefined){
			this.onprogress = onprogress;
			this.domElement = document.createElement("div");
			this.domElement.style.position = 'absolute';
			this.domElement.style.top = '0';
			this.domElement.style.left = '0';
			this.domElement.style.width = '100%';
			this.domElement.style.height = '100%';
			this.domElement.style.background = '#000';
			this.domElement.style.opacity = '0.7';
			this.domElement.style.display = 'flex';
			this.domElement.style.alignItems = 'center';
			this.domElement.style.justifyContent = 'center';
			this.domElement.style.zIndex = '1111';
			const barBase = document.createElement("div");
			barBase.style.background = '#aaa';
			barBase.style.width = '50%';
			barBase.style.minWidth = '250px';
			barBase.style.borderRadius = '10px';
			barBase.style.height = '15px';
			this.domElement.appendChild(barBase);
			const bar = document.createElement("div");
			bar.style.background = '#2a2';
			bar.style.width = '50%';
			bar.style.borderRadius = '10px';
			bar.style.height = '100%';
			bar.style.width = '0';
			barBase.appendChild(bar);
			this.progressBar = bar;
			if (this.container!=undefined){
				this.container.appendChild(this.domElement);
			}else{
				document.body.appendChild(this.domElement);
			}
		}else{
			this.onprogress = options.onprogress;
		}

		this.oncomplete = options.oncomplete;

		const loader = this;
		function onprogress(delta){
			const progress = delta*100;
			loader.progressBar.style.width = `${progress}%`;
		}
	}

	checkCompleted(){
		for(let prop in this.assets){
			const asset = this.assets[prop];
			if (!asset.complete) return false;
		}
		return true;
	}

	get progress(){
		let total = 0;
		let loaded = 0;

		for(let prop in this.assets){
			const asset = this.assets[prop];
			if (asset.total == undefined){
				loaded = 0;
				break;
			}
			loaded += asset.loaded;
			total += asset.total;
		}

		return loaded/total;
	}

	load(url){
		const loader = this;
		var xobj = new XMLHttpRequest();
		xobj.overrideMimeType("application/json");
		xobj.open('GET', url, true);
		xobj.onreadystatechange = function () {
			  if (xobj.readyState == 4 && xobj.status == "200") {
				  loader.assets[url].complete = true;
				  if (loader.checkCompleted()){
					  if (loader.domElement!=undefined){
						  if (loader.container!=undefined){
							  loader.container.removeChild(loader.domElement);
						  }else{
							  document.body.removeChild(loader.domElement);
						  }
					  }
					  loader.oncomplete();
				  }
			  }
		};
		xobj.onprogress = function(e){
			const asset = loader.assets[url];
			asset.loaded = e.loaded;
			asset.total = e.total;
			loader.onprogress(loader.progress);
		}
		xobj.send(null);
	}
}