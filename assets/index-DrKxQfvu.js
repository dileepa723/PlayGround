(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Bo="187",vu=0,Al=1,Mu=2,Lr=1,Su=2,As=3,Ai=0,cn=1,qe=2,ts=0,es=1,zn=2,Rl=3,Cl=4,yu=5,Qi=100,Eu=101,bu=102,wu=103,Tu=104,Au=200,Ru=201,Cu=202,Pu=203,Zc=204,$c=205,Lu=206,Iu=207,Du=208,Nu=209,Uu=210,Ou=211,Fu=212,Bu=213,zu=214,Ha=0,Va=1,Wa=2,Us=3,Xa=4,qa=5,Ya=6,Za=7,Jc=0,Gu=1,ku=2,Kn=0,Kc=1,Qc=2,jc=3,zo=4,th=5,eh=6,nh=7,ih=300,ss=301,Os=302,Ir=303,la=304,rs=1e3,Jn=1001,$a=1002,$e=1003,Hu=1004,Qs=1005,un=1006,ca=1007,pi=1008,xn=1009,sh=1010,rh=1011,Fs=1012,Go=1013,Gn=1014,Rn=1015,kn=1016,ko=1017,Ho=1018,as=1020,ah=35902,oh=35899,lh=1021,ch=1022,Un=1023,gi=1026,mi=1027,Vo=1028,Wo=1029,Ri=1030,Xo=1031,qo=1033,Dr=33776,Nr=33777,Ur=33778,Or=33779,Ja=35840,Ka=35841,Qa=35842,ja=35843,to=36196,eo=37492,no=37496,io=37488,so=37489,Br=37490,ro=37491,ao=37808,oo=37809,lo=37810,co=37811,ho=37812,uo=37813,fo=37814,po=37815,mo=37816,go=37817,xo=37818,_o=37819,vo=37820,Mo=37821,So=36492,yo=36494,Eo=36495,bo=36283,wo=36284,zr=36285,To=36286,Vu=3200,Ao=0,Wu=1,di="",ln="srgb",Gr="srgb-linear",kr="linear",Se="srgb",ha=7680,Xu=519,qu=512,Yu=513,Zu=514,hh=515,$u=516,Ju=517,uh=518,fh=519,dh=35044,Pl="300 es",Cn=2e3,Bs=2001;function Ku(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Hr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Qu(){const i=Hr("canvas");return i.style.display="block",i}const Ll={};function Vr(...i){const t="THREE."+i.shift();console.log(t,...i)}function ph(i){const t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Xt(...i){i=ph(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function fe(...i){i=ph(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function ns(...i){const t=i.join(" ");t in Ll||(Ll[t]=!0,Xt(...i))}function ju(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const tf={[Ha]:Ha,[Wa]:Ya,[Xa]:Xa,[Us]:qa,[Va]:Va,[Ya]:Wa,[Za]:Za,[qa]:Us};class Li{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Qe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Il=1234567;const Ps=Math.PI/180,os=180/Math.PI;function si(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Qe[i&255]+Qe[i>>8&255]+Qe[i>>16&255]+Qe[i>>24&255]+"-"+Qe[t&255]+Qe[t>>8&255]+"-"+Qe[t>>16&15|64]+Qe[t>>24&255]+"-"+Qe[e&63|128]+Qe[e>>8&255]+"-"+Qe[e>>16&255]+Qe[e>>24&255]+Qe[n&255]+Qe[n>>8&255]+Qe[n>>16&255]+Qe[n>>24&255]).toLowerCase()}function ne(i,t,e){return Math.max(t,Math.min(e,i))}function Yo(i,t){return(i%t+t)%t}function ef(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function nf(i,t,e){return i!==t?(e-i)/(t-i):0}function Ls(i,t,e){return(1-e)*i+e*t}function sf(i,t,e,n){return Ls(i,t,1-Math.exp(-e*n))}function rf(i,t=1){return t-Math.abs(Yo(i,t*2)-t)}function af(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function of(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function lf(i,t){return i+Math.floor(Math.random()*(t-i+1))}function cf(i,t){return i+Math.random()*(t-i)}function hf(i){return i*(.5-Math.random())}function uf(i){i!==void 0&&(Il=i);let t=Il+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function ff(i){return i*Ps}function df(i){return i*os}function pf(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function mf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function mh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function gf(i,t,e,n,s){const r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),u=r((t-n)/2),f=a((t-n)/2),d=r((n-t)/2),p=a((n-t)/2);switch(s){case"XYX":i.set(o*h,l*u,l*f,o*c);break;case"YZY":i.set(l*f,o*h,l*u,o*c);break;case"ZXZ":i.set(l*u,l*f,o*h,o*c);break;case"XZX":i.set(o*h,l*p,l*d,o*c);break;case"YXY":i.set(l*d,o*h,l*p,o*c);break;case"ZYZ":i.set(l*p,l*d,o*h,o*c);break;default:Xt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function $r(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Zo(i,t){if(t.constructor===Float32Array)return i;const e=$r(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/e,-1)}function $o(i,t){if(t.constructor===Float32Array)return i;const e=$r(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*e)}const xf={DEG2RAD:Ps,RAD2DEG:os,generateUUID:si,clamp:ne,euclideanModulo:Yo,mapLinear:ef,inverseLerp:nf,lerp:Ls,damp:sf,pingpong:rf,smoothstep:af,smootherstep:of,randInt:lf,randFloat:cf,randFloatSpread:hf,seededRandom:uf,degToRad:ff,radToDeg:df,isPowerOfTwo:pf,ceilPowerOfTwo:mf,floorPowerOfTwo:mh,setQuaternionFromProperEuler:gf,normalize:$o,denormalize:Zo},fl=class fl{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ne(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ne(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};fl.prototype.isVector2=!0;let at=fl;class Ii{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3],f=r[a+0],d=r[a+1],p=r[a+2],_=r[a+3];if(u!==_||l!==f||c!==d||h!==p){let m=l*f+c*d+h*p+u*_;m<0&&(f=-f,d=-d,p=-p,_=-_,m=-m);let g=1-o;if(m<.9995){const v=Math.acos(m),b=Math.sin(v);g=Math.sin(g*v)/b,o=Math.sin(o*v)/b,l=l*g+f*o,c=c*g+d*o,h=h*g+p*o,u=u*g+_*o}else{l=l*g+f*o,c=c*g+d*o,h=h*g+p*o,u=u*g+_*o;const v=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=v,c*=v,h*=v,u*=v}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[a],f=r[a+1],d=r[a+2],p=r[a+3];return t[e]=o*p+h*u+l*d-c*f,t[e+1]=l*p+h*f+c*u-o*d,t[e+2]=c*p+h*d+o*f-l*u,t[e+3]=h*p-o*u-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),u=o(r/2),f=l(n/2),d=l(s/2),p=l(r/2);switch(a){case"XYZ":this._x=f*h*u+c*d*p,this._y=c*d*u-f*h*p,this._z=c*h*p+f*d*u,this._w=c*h*u-f*d*p;break;case"YXZ":this._x=f*h*u+c*d*p,this._y=c*d*u-f*h*p,this._z=c*h*p-f*d*u,this._w=c*h*u+f*d*p;break;case"ZXY":this._x=f*h*u-c*d*p,this._y=c*d*u+f*h*p,this._z=c*h*p+f*d*u,this._w=c*h*u-f*d*p;break;case"ZYX":this._x=f*h*u-c*d*p,this._y=c*d*u+f*h*p,this._z=c*h*p-f*d*u,this._w=c*h*u+f*d*p;break;case"YZX":this._x=f*h*u+c*d*p,this._y=c*d*u+f*h*p,this._z=c*h*p-f*d*u,this._w=c*h*u-f*d*p;break;case"XZY":this._x=f*h*u-c*d*p,this._y=c*d*u-f*h*p,this._z=c*h*p+f*d*u,this._w=c*h*u+f*d*p;break;default:Xt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=n+o+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(a-s)*d}else if(n>o&&n>u){const d=2*Math.sqrt(1+n-o-u);this._w=(h-l)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+c)/d}else if(o>u){const d=2*Math.sqrt(1+o-n-u);this._w=(r-c)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+u-n-o);this._w=(a-s)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ne(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const dl=class dl{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Dl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Dl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),u=2*(r*n-a*e);return this.x=e+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this.z=ne(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this.z=ne(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ne(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ua.copy(this).projectOnVector(t),this.sub(ua)}reflect(t){return this.sub(ua.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ne(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};dl.prototype.isVector3=!0;let P=dl;const ua=new P,Dl=new Ii,pl=class pl{constructor(t,e,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],d=n[5],p=n[8],_=s[0],m=s[3],g=s[6],v=s[1],b=s[4],S=s[7],T=s[2],w=s[5],x=s[8];return r[0]=a*_+o*v+l*T,r[3]=a*m+o*b+l*w,r[6]=a*g+o*S+l*x,r[1]=c*_+h*v+u*T,r[4]=c*m+h*b+u*w,r[7]=c*g+h*S+u*x,r[2]=f*_+d*v+p*T,r[5]=f*m+d*b+p*w,r[8]=f*g+d*S+p*x,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,f=o*l-h*r,d=c*r-a*l,p=e*u+n*f+s*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/p;return t[0]=u*_,t[1]=(s*c-h*n)*_,t[2]=(o*n-s*a)*_,t[3]=f*_,t[4]=(h*e-s*l)*_,t[5]=(s*r-o*e)*_,t[6]=d*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return ns("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(fa.makeScale(t,e)),this}rotate(t){return ns("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(fa.makeRotation(-t)),this}translate(t,e){return ns("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(fa.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};pl.prototype.isMatrix3=!0;let Yt=pl;const fa=new Yt,Nl=new Yt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ul=new Yt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function _f(){const i={enabled:!0,workingColorSpace:Gr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Se&&(s.r=Qn(s.r),s.g=Qn(s.g),s.b=Qn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Se&&(s.r=is(s.r),s.g=is(s.g),s.b=is(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===di?kr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Gr]:{primaries:t,whitePoint:n,transfer:kr,toXYZ:Nl,fromXYZ:Ul,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:ln},outputColorSpaceConfig:{drawingBufferColorSpace:ln}},[ln]:{primaries:t,whitePoint:n,transfer:Se,toXYZ:Nl,fromXYZ:Ul,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:ln}}}),i}const ce=_f();function Qn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function is(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ui;class vf{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Ui===void 0&&(Ui=Hr("canvas")),Ui.width=t.width,Ui.height=t.height;const s=Ui.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Ui}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Hr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Qn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Qn(e[n]/255)*255):e[n]=Qn(e[n]);return{data:e,width:t.width,height:t.height}}else return Xt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Mf=0;class Jo{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Mf++}),this.uuid=si(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(da(s[a].image)):r.push(da(s[a]))}else r=da(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function da(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?vf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Xt("Texture: Unable to serialize Texture."),{})}let Sf=0;const pa=new P;class en extends Li{constructor(t=en.DEFAULT_IMAGE,e=en.DEFAULT_MAPPING,n=Jn,s=Jn,r=un,a=pi,o=Un,l=xn,c=en.DEFAULT_ANISOTROPY,h=di){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Sf++}),this.uuid=si(),this.name="",this.source=new Jo(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new at(0,0),this.repeat=new at(1,1),this.center=new at(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Yt,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(pa).x}get height(){return this.source.getSize(pa).y}get depth(){return this.source.getSize(pa).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Xt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Xt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ih)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case rs:t.x=t.x-Math.floor(t.x);break;case Jn:t.x=t.x<0?0:1;break;case $a:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case rs:t.y=t.y-Math.floor(t.y);break;case Jn:t.y=t.y<0?0:1;break;case $a:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}en.DEFAULT_IMAGE=null;en.DEFAULT_MAPPING=ih;en.DEFAULT_ANISOTROPY=1;const ml=class ml{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],p=l[9],_=l[2],m=l[6],g=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(p-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(p+m)<.1&&Math.abs(c+d+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(c+1)/2,S=(d+1)/2,T=(g+1)/2,w=(h+f)/4,x=(u+_)/4,M=(p+m)/4;return b>S&&b>T?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=w/n,r=x/n):S>T?S<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),n=w/s,r=M/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=x/r,s=M/r),this.set(n,s,r,e),this}let v=Math.sqrt((m-p)*(m-p)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(v)<.001&&(v=1),this.x=(m-p)/v,this.y=(u-_)/v,this.z=(f-h)/v,this.w=Math.acos((c+d+g-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this.z=ne(this.z,t.z,e.z),this.w=ne(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this.z=ne(this.z,t,e),this.w=ne(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ne(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};ml.prototype.isVector4=!0;let Pe=ml;class yf extends Li{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:un,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Pe(0,0,t,e),this.scissorTest=!1,this.viewport=new Pe(0,0,t,e),this.textures=[];const s=n.count;for(let r=0;r<s;r++)this.textures[r]=new en({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:un,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Jo(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Fn extends yf{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class gh extends en{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=$e,this.minFilter=$e,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ef extends en{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=$e,this.minFilter=$e,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}const Zr=class Zr{constructor(t,e,n,s,r,a,o,l,c,h,u,f,d,p,_,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,u,f,d,p,_,m)}set(t,e,n,s,r,a,o,l,c,h,u,f,d,p,_,m){const g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=s,g[1]=r,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=h,g[10]=u,g[14]=f,g[3]=d,g[7]=p,g[11]=_,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Zr().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,n=t.elements,s=1/Oi.setFromMatrixColumn(t,0).length(),r=1/Oi.setFromMatrixColumn(t,1).length(),a=1/Oi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=a*h,d=a*u,p=o*h,_=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+p*c,e[5]=f-_*c,e[9]=-o*l,e[2]=_-f*c,e[6]=p+d*c,e[10]=a*l}else if(t.order==="YXZ"){const f=l*h,d=l*u,p=c*h,_=c*u;e[0]=f+_*o,e[4]=p*o-d,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=d*o-p,e[6]=_+f*o,e[10]=a*l}else if(t.order==="ZXY"){const f=l*h,d=l*u,p=c*h,_=c*u;e[0]=f-_*o,e[4]=-a*u,e[8]=p+d*o,e[1]=d+p*o,e[5]=a*h,e[9]=_-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const f=a*h,d=a*u,p=o*h,_=o*u;e[0]=l*h,e[4]=p*c-d,e[8]=f*c+_,e[1]=l*u,e[5]=_*c+f,e[9]=d*c-p,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const f=a*l,d=a*c,p=o*l,_=o*c;e[0]=l*h,e[4]=_-f*u,e[8]=p*u+d,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=d*u+p,e[10]=f-_*u}else if(t.order==="XZY"){const f=a*l,d=a*c,p=o*l,_=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+_,e[5]=a*h,e[9]=d*u-p,e[2]=p*u-d,e[6]=o*h,e[10]=_*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(bf,t,wf)}lookAt(t,e,n){const s=this.elements;return dn.subVectors(t,e),dn.lengthSq()===0&&(dn.z=1),dn.normalize(),oi.crossVectors(n,dn),oi.lengthSq()===0&&(Math.abs(n.z)===1?dn.x+=1e-4:dn.z+=1e-4,dn.normalize(),oi.crossVectors(n,dn)),oi.normalize(),js.crossVectors(dn,oi),s[0]=oi.x,s[4]=js.x,s[8]=dn.x,s[1]=oi.y,s[5]=js.y,s[9]=dn.y,s[2]=oi.z,s[6]=js.z,s[10]=dn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],d=n[13],p=n[2],_=n[6],m=n[10],g=n[14],v=n[3],b=n[7],S=n[11],T=n[15],w=s[0],x=s[4],M=s[8],C=s[12],A=s[1],I=s[5],N=s[9],F=s[13],L=s[2],z=s[6],X=s[10],G=s[14],it=s[3],q=s[7],tt=s[11],nt=s[15];return r[0]=a*w+o*A+l*L+c*it,r[4]=a*x+o*I+l*z+c*q,r[8]=a*M+o*N+l*X+c*tt,r[12]=a*C+o*F+l*G+c*nt,r[1]=h*w+u*A+f*L+d*it,r[5]=h*x+u*I+f*z+d*q,r[9]=h*M+u*N+f*X+d*tt,r[13]=h*C+u*F+f*G+d*nt,r[2]=p*w+_*A+m*L+g*it,r[6]=p*x+_*I+m*z+g*q,r[10]=p*M+_*N+m*X+g*tt,r[14]=p*C+_*F+m*G+g*nt,r[3]=v*w+b*A+S*L+T*it,r[7]=v*x+b*I+S*z+T*q,r[11]=v*M+b*N+S*X+T*tt,r[15]=v*C+b*F+S*G+T*nt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],d=t[14],p=t[3],_=t[7],m=t[11],g=t[15],v=l*d-c*f,b=o*d-c*u,S=o*f-l*u,T=a*d-c*h,w=a*f-l*h,x=a*u-o*h;return e*(_*v-m*b+g*S)-n*(p*v-m*T+g*w)+s*(p*b-_*T+g*x)-r*(p*S-_*w+m*x)}determinantAffine(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-n*(r*h-o*l)+s*(r*c-a*l)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],d=t[11],p=t[12],_=t[13],m=t[14],g=t[15],v=e*o-n*a,b=e*l-s*a,S=e*c-r*a,T=n*l-s*o,w=n*c-r*o,x=s*c-r*l,M=h*_-u*p,C=h*m-f*p,A=h*g-d*p,I=u*m-f*_,N=u*g-d*_,F=f*g-d*m,L=v*F-b*N+S*I+T*A-w*C+x*M;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const z=1/L;return t[0]=(o*F-l*N+c*I)*z,t[1]=(s*N-n*F-r*I)*z,t[2]=(_*x-m*w+g*T)*z,t[3]=(f*w-u*x-d*T)*z,t[4]=(l*A-a*F-c*C)*z,t[5]=(e*F-s*A+r*C)*z,t[6]=(m*S-p*x-g*b)*z,t[7]=(h*x-f*S+d*b)*z,t[8]=(a*N-o*A+c*M)*z,t[9]=(n*A-e*N-r*M)*z,t[10]=(p*w-_*S+g*v)*z,t[11]=(u*S-h*w-d*v)*z,t[12]=(o*C-a*I-l*M)*z,t[13]=(e*I-n*C+s*M)*z,t[14]=(_*b-p*T-m*v)*z,t[15]=(h*T-u*b+f*v)*z,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,f=r*c,d=r*h,p=r*u,_=a*h,m=a*u,g=o*u,v=l*c,b=l*h,S=l*u,T=n.x,w=n.y,x=n.z;return s[0]=(1-(_+g))*T,s[1]=(d+S)*T,s[2]=(p-b)*T,s[3]=0,s[4]=(d-S)*w,s[5]=(1-(f+g))*w,s[6]=(m+v)*w,s[7]=0,s[8]=(p+b)*x,s[9]=(m-v)*x,s[10]=(1-(f+_))*x,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=Oi.set(s[0],s[1],s[2]).length();const o=Oi.set(s[4],s[5],s[6]).length(),l=Oi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),En.copy(this);const c=1/a,h=1/o,u=1/l;return En.elements[0]*=c,En.elements[1]*=c,En.elements[2]*=c,En.elements[4]*=h,En.elements[5]*=h,En.elements[6]*=h,En.elements[8]*=u,En.elements[9]*=u,En.elements[10]*=u,e.setFromRotationMatrix(En),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,s,r,a,o=Cn,l=!1){const c=this.elements,h=2*r/(e-t),u=2*r/(n-s),f=(e+t)/(e-t),d=(n+s)/(n-s);let p,_;if(l)p=r/(a-r),_=a*r/(a-r);else if(o===Cn)p=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Bs)p=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=Cn,l=!1){const c=this.elements,h=2/(e-t),u=2/(n-s),f=-(e+t)/(e-t),d=-(n+s)/(n-s);let p,_;if(l)p=1/(a-r),_=a/(a-r);else if(o===Cn)p=-2/(a-r),_=-(a+r)/(a-r);else if(o===Bs)p=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=u,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Zr.prototype.isMatrix4=!0;let _e=Zr;const Oi=new P,En=new _e,bf=new P(0,0,0),wf=new P(1,1,1),oi=new P,js=new P,dn=new P,Ol=new _e,Fl=new Ii;class xi{constructor(t=0,e=0,n=0,s=xi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(ne(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ne(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ne(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ne(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ne(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-ne(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Xt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ol.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ol,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Fl.setFromEuler(this),this.setFromQuaternion(Fl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}xi.DEFAULT_ORDER="XYZ";class xh{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Tf=0;const Bl=new P,Fi=new Ii,Xn=new _e,tr=new P,ms=new P,Af=new P,Rf=new Ii,zl=new P(1,0,0),Gl=new P(0,1,0),kl=new P(0,0,1),Hl={type:"added"},Cf={type:"removed"},Bi={type:"childadded",child:null},ma={type:"childremoved",child:null};class Ne extends Li{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Tf++}),this.uuid=si(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ne.DEFAULT_UP.clone();const t=new P,e=new xi,n=new Ii,s=new P(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new _e},normalMatrix:{value:new Yt}}),this.matrix=new _e,this.matrixWorld=new _e,this.matrixAutoUpdate=Ne.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ne.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Fi.setFromAxisAngle(t,e),this.quaternion.multiply(Fi),this}rotateOnWorldAxis(t,e){return Fi.setFromAxisAngle(t,e),this.quaternion.premultiply(Fi),this}rotateX(t){return this.rotateOnAxis(zl,t)}rotateY(t){return this.rotateOnAxis(Gl,t)}rotateZ(t){return this.rotateOnAxis(kl,t)}translateOnAxis(t,e){return Bl.copy(t).applyQuaternion(this.quaternion),this.position.add(Bl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(zl,t)}translateY(t){return this.translateOnAxis(Gl,t)}translateZ(t){return this.translateOnAxis(kl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Xn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?tr.copy(t):tr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ms.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Xn.lookAt(ms,tr,this.up):Xn.lookAt(tr,ms,this.up),this.quaternion.setFromRotationMatrix(Xn),s&&(Xn.extractRotation(s.matrixWorld),Fi.setFromRotationMatrix(Xn),this.quaternion.premultiply(Fi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(fe("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Hl),Bi.child=t,this.dispatchEvent(Bi),Bi.child=null):fe("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Cf),ma.child=t,this.dispatchEvent(ma),ma.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Xn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Xn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Xn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Hl),Bi.child=t,this.dispatchEvent(Bi),Bi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ms,t,Af),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ms,Rf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),d=a(t.animations),p=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Ne.DEFAULT_UP=new P(0,1,0);Ne.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ne.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Re extends Ne{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Pf={type:"move"};class ga{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Re,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Re,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Re,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),g=this._getHandJoint(c,_);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,p=.005;c.inputState.pinching&&f>d+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Pf)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Re;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const _h={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},li={h:0,s:0,l:0},er={h:0,s:0,l:0};function xa(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Jt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ln){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ce.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=ce.workingColorSpace){return this.r=t,this.g=e,this.b=n,ce.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=ce.workingColorSpace){if(t=Yo(t,1),e=ne(e,0,1),n=ne(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=xa(a,r,t+1/3),this.g=xa(a,r,t),this.b=xa(a,r,t-1/3)}return ce.colorSpaceToWorking(this,s),this}setStyle(t,e=ln){function n(r){r!==void 0&&parseFloat(r)<1&&Xt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Xt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Xt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ln){const n=_h[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Xt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Qn(t.r),this.g=Qn(t.g),this.b=Qn(t.b),this}copyLinearToSRGB(t){return this.r=is(t.r),this.g=is(t.g),this.b=is(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ln){return ce.workingToColorSpace(je.copy(this),t),Math.round(ne(je.r*255,0,255))*65536+Math.round(ne(je.g*255,0,255))*256+Math.round(ne(je.b*255,0,255))}getHexString(t=ln){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ce.workingColorSpace){ce.workingToColorSpace(je.copy(this),e);const n=je.r,s=je.g,r=je.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ce.workingColorSpace){return ce.workingToColorSpace(je.copy(this),e),t.r=je.r,t.g=je.g,t.b=je.b,t}getStyle(t=ln){ce.workingToColorSpace(je.copy(this),t);const e=je.r,n=je.g,s=je.b;return t!==ln?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(li),this.setHSL(li.h+t,li.s+e,li.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(li),t.getHSL(er);const n=Ls(li.h,er.h,e),s=Ls(li.s,er.s,e),r=Ls(li.l,er.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const je=new Jt;Jt.NAMES=_h;class Ko{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Jt(t),this.near=e,this.far=n}clone(){return new Ko(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Lf extends Ne{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new xi,this.environmentIntensity=1,this.environmentRotation=new xi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}}const bn=new P,qn=new P,_a=new P,Yn=new P,zi=new P,Gi=new P,Vl=new P,va=new P,Ma=new P,Sa=new P,ya=new Pe,Ea=new Pe,ba=new Pe;class Mn{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),bn.subVectors(t,e),s.cross(bn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){bn.subVectors(s,e),qn.subVectors(n,e),_a.subVectors(t,e);const a=bn.dot(bn),o=bn.dot(qn),l=bn.dot(_a),c=qn.dot(qn),h=qn.dot(_a),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(c*l-o*h)*f,p=(a*h-o*l)*f;return r.set(1-d-p,p,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Yn)===null?!1:Yn.x>=0&&Yn.y>=0&&Yn.x+Yn.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,Yn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Yn.x),l.addScaledVector(a,Yn.y),l.addScaledVector(o,Yn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return ya.setScalar(0),Ea.setScalar(0),ba.setScalar(0),ya.fromBufferAttribute(t,e),Ea.fromBufferAttribute(t,n),ba.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(ya,r.x),a.addScaledVector(Ea,r.y),a.addScaledVector(ba,r.z),a}static isFrontFacing(t,e,n,s){return bn.subVectors(n,e),qn.subVectors(t,e),bn.cross(qn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return bn.subVectors(this.c,this.b),qn.subVectors(this.a,this.b),bn.cross(qn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Mn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Mn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Mn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Mn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Mn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;zi.subVectors(s,n),Gi.subVectors(r,n),va.subVectors(t,n);const l=zi.dot(va),c=Gi.dot(va);if(l<=0&&c<=0)return e.copy(n);Ma.subVectors(t,s);const h=zi.dot(Ma),u=Gi.dot(Ma);if(h>=0&&u<=h)return e.copy(s);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0&&l-h>0)return a=l/(l-h),e.copy(n).addScaledVector(zi,a);Sa.subVectors(t,r);const d=zi.dot(Sa),p=Gi.dot(Sa);if(p>=0&&d<=p)return e.copy(r);const _=d*c-l*p;if(_<=0&&c>=0&&p<=0)return o=c/(c-p),e.copy(n).addScaledVector(Gi,o);const m=h*p-d*u;if(m<=0&&u-h>=0&&d-p>=0)return Vl.subVectors(r,s),o=(u-h)/(u-h+(d-p)),e.copy(s).addScaledVector(Vl,o);const g=1/(m+_+f);return a=_*g,o=f*g,e.copy(n).addScaledVector(zi,a).addScaledVector(Gi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Di{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(wn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(wn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=wn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,wn):wn.fromBufferAttribute(r,a),wn.applyMatrix4(t.matrixWorld),this.expandByPoint(wn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),nr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),nr.copy(n.boundingBox)),nr.applyMatrix4(t.matrixWorld),this.union(nr)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,wn),wn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(gs),ir.subVectors(this.max,gs),ki.subVectors(t.a,gs),Hi.subVectors(t.b,gs),Vi.subVectors(t.c,gs),ci.subVectors(Hi,ki),hi.subVectors(Vi,Hi),yi.subVectors(ki,Vi);let e=[0,-ci.z,ci.y,0,-hi.z,hi.y,0,-yi.z,yi.y,ci.z,0,-ci.x,hi.z,0,-hi.x,yi.z,0,-yi.x,-ci.y,ci.x,0,-hi.y,hi.x,0,-yi.y,yi.x,0];return!wa(e,ki,Hi,Vi,ir)||(e=[1,0,0,0,1,0,0,0,1],!wa(e,ki,Hi,Vi,ir))?!1:(sr.crossVectors(ci,hi),e=[sr.x,sr.y,sr.z],wa(e,ki,Hi,Vi,ir))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,wn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(wn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Zn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Zn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Zn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Zn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Zn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Zn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Zn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Zn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Zn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Zn=[new P,new P,new P,new P,new P,new P,new P,new P],wn=new P,nr=new Di,ki=new P,Hi=new P,Vi=new P,ci=new P,hi=new P,yi=new P,gs=new P,ir=new P,sr=new P,Ei=new P;function wa(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Ei.fromArray(i,r);const o=s.x*Math.abs(Ei.x)+s.y*Math.abs(Ei.y)+s.z*Math.abs(Ei.z),l=t.dot(Ei),c=e.dot(Ei),h=n.dot(Ei);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Fe=new P,rr=new at;let If=0;class Ln extends Li{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:If++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=dh,this.updateRanges=[],this.gpuType=Rn,this.version=0,this._normalizationScale=t!==void 0?$r(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)rr.fromBufferAttribute(this,e),rr.applyMatrix3(t),this.setXY(e,rr.x,rr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix3(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix4(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyNormalMatrix(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.transformDirection(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){const e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):Zo(t,this.array)}_normalize(t){const e=this._normalizationScale;return e!==void 0?Math.round(t*e):$o(t,this.array)}}class vh extends Ln{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Mh extends Ln{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ve extends Ln{constructor(t,e,n){super(new Float32Array(t),e,n)}}const Df=new Di,xs=new P,Ta=new P;class fs{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Df.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;xs.subVectors(t,this.center);const e=xs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(xs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ta.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(xs.copy(t.center).add(Ta)),this.expandByPoint(xs.copy(t.center).sub(Ta))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let Nf=0;const _n=new _e,Aa=new Ne,Wi=new P,pn=new Di,_s=new Di,Xe=new P;class He extends Li{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Nf++}),this.uuid=si(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ku(t)?Mh:vh)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Yt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return _n.makeRotationFromQuaternion(t),this.applyMatrix4(_n),this}rotateX(t){return _n.makeRotationX(t),this.applyMatrix4(_n),this}rotateY(t){return _n.makeRotationY(t),this.applyMatrix4(_n),this}rotateZ(t){return _n.makeRotationZ(t),this.applyMatrix4(_n),this}translate(t,e,n){return _n.makeTranslation(t,e,n),this.applyMatrix4(_n),this}scale(t,e,n){return _n.makeScale(t,e,n),this.applyMatrix4(_n),this}lookAt(t){return Aa.lookAt(t),Aa.updateMatrix(),this.applyMatrix4(Aa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Wi).negate(),this.translate(Wi.x,Wi.y,Wi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ve(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Xt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Di);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){fe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];pn.setFromBufferAttribute(r),this.morphTargetsRelative?(Xe.addVectors(this.boundingBox.min,pn.min),this.boundingBox.expandByPoint(Xe),Xe.addVectors(this.boundingBox.max,pn.max),this.boundingBox.expandByPoint(Xe)):(this.boundingBox.expandByPoint(pn.min),this.boundingBox.expandByPoint(pn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&fe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){fe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){const n=this.boundingSphere.center;if(pn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];_s.setFromBufferAttribute(o),this.morphTargetsRelative?(Xe.addVectors(pn.min,_s.min),pn.expandByPoint(Xe),Xe.addVectors(pn.max,_s.max),pn.expandByPoint(Xe)):(pn.expandByPoint(_s.min),pn.expandByPoint(_s.max))}pn.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Xe.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Xe));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Xe.fromBufferAttribute(o,c),l&&(Wi.fromBufferAttribute(t,c),Xe.add(Wi)),s=Math.max(s,n.distanceToSquared(Xe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&fe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){fe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Ln(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[],c=new Uint8Array(n.count);for(let C=0;C<n.count;C++)o[C]=new P,l[C]=new P;const h=new P,u=new P,f=new P,d=new at,p=new at,_=new at,m=new P,g=new P;function v(C,A,I){c[C]=c[A]=c[I]=1,h.fromBufferAttribute(n,C),u.fromBufferAttribute(n,A),f.fromBufferAttribute(n,I),d.fromBufferAttribute(r,C),p.fromBufferAttribute(r,A),_.fromBufferAttribute(r,I),u.sub(h),f.sub(h),p.sub(d),_.sub(d);const N=1/(p.x*_.y-_.x*p.y);isFinite(N)&&(m.copy(u).multiplyScalar(_.y).addScaledVector(f,-p.y).multiplyScalar(N),g.copy(f).multiplyScalar(p.x).addScaledVector(u,-_.x).multiplyScalar(N),o[C].add(m),o[A].add(m),o[I].add(m),l[C].add(g),l[A].add(g),l[I].add(g))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let C=0,A=b.length;C<A;++C){const I=b[C],N=I.start,F=I.count;for(let L=N,z=N+F;L<z;L+=3)v(t.getX(L+0),t.getX(L+1),t.getX(L+2))}const S=new P,T=new P,w=new P,x=new P;function M(C){w.fromBufferAttribute(s,C),x.copy(w);const A=o[C];S.copy(A),S.sub(w.multiplyScalar(w.dot(A))).normalize(),T.crossVectors(x,A);const N=T.dot(l[C])<0?-1:1;a.setXYZW(C,S.x,S.y,S.z,N)}for(let C=0,A=n.count;C<A;++C)c[C]&&M(C);this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Ln(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const s=new P,r=new P,a=new P,o=new P,l=new P,c=new P,h=new P,u=new P;if(t)for(let f=0,d=t.count;f<d;f+=3){const p=t.getX(f+0),_=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,p),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Xe.fromBufferAttribute(t,e),Xe.normalize(),t.setXYZ(e,Xe.x,Xe.y,Xe.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,f=new c.constructor(l.length*h);let d=0,p=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?d=l[_]*o.data.stride+o.offset:d=l[_]*h;for(let g=0;g<h;g++)f[p++]=c[d++]}return new Ln(f,h,u)}if(this.index===null)return Xt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new He,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const f=c[h],d=t(f,n);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Uf{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=dh,this.updateRanges=[],this.version=0,this.uuid=si()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={});const e=Wl(this.array);t.arrayBuffers[e]===void 0&&(t.arrayBuffers[e]=this.array.slice(0).buffer);const n=new this.array.constructor(t.arrayBuffers[e]),s=new this.constructor(n,this.stride);return s.setUsage(this.usage),s}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={});const e=Wl(this.array);t.arrayBuffers[e]===void 0&&(t.arrayBuffers[e]=Array.from(new Uint32Array(this.array.slice(0).buffer)));const n={uuid:this.uuid,buffer:e,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}}function Wl(i){return i.buffer._uuid===void 0&&(i.buffer._uuid=si()),i.byteOffset===0&&i.byteLength===i.buffer.byteLength?i.buffer._uuid:i.buffer._uuid+":"+i.byteOffset+":"+i.byteLength}const rn=new P;class Wr{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s,this._normalizationScale=t!==void 0?$r(t.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)rn.fromBufferAttribute(this,e),rn.applyMatrix4(t),this.setXYZ(e,rn.x,rn.y,rn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)rn.fromBufferAttribute(this,e),rn.applyNormalMatrix(t),this.setXYZ(e,rn.x,rn.y,rn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)rn.fromBufferAttribute(this,e),rn.transformDirection(t),this.setXYZ(e,rn.x,rn.y,rn.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=this._denormalize(e)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=this._denormalize(e)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=this._denormalize(e)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=this._denormalize(e)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){Vr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Ln(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Wr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){Vr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(t){const e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):Zo(t,this.data.array)}_normalize(t){const e=this._normalizationScale;return e!==void 0?Math.round(t*e):$o(t,this.data.array)}}const Ra=new P,Of=new P,Ff=new Yt;class fi{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Ra.subVectors(n,e).cross(Of.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){const s=t.delta(Ra),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Ff.getNormalMatrix(t),s=this.coplanarPoint(Ra).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let Bf=0;class Ni extends Li{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Bf++}),this.uuid=si(),this.name="",this.type="Material",this.blending=es,this.side=Ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Zc,this.blendDst=$c,this.blendEquation=Qi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Jt(0,0,0),this.blendAlpha=0,this.depthFunc=Us,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Xu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ha,this.stencilZFail=ha,this.stencilZPass=ha,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Xt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Xt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Jt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new fi().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new at().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new at().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class ti extends Ni{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Jt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Xi;const vs=new P,qi=new P,Yi=new P,Zi=new at,Ms=new at,Sh=new _e,ar=new P,Ss=new P,or=new P,Xl=new at,Ca=new at,ql=new at;class _i extends Ne{constructor(t=new ti){if(super(),this.isSprite=!0,this.type="Sprite",Xi===void 0){Xi=new He;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Uf(e,5);Xi.setIndex([0,1,2,0,2,3]),Xi.setAttribute("position",new Wr(n,3,0,!1)),Xi.setAttribute("uv",new Wr(n,2,3,!1))}this.geometry=Xi,this.material=t,this.center=new at(.5,.5),this.count=1}intersectsFrustum(t){return t.intersectsSprite(this)}raycast(t,e){t.camera===null&&fe('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),qi.setFromMatrixScale(this.matrixWorld),Sh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Yi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&qi.multiplyScalar(-Yi.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;lr(ar.set(-.5,-.5,0),Yi,a,qi,s,r),lr(Ss.set(.5,-.5,0),Yi,a,qi,s,r),lr(or.set(.5,.5,0),Yi,a,qi,s,r),Xl.set(0,0),Ca.set(1,0),ql.set(1,1);let o=t.ray.intersectTriangle(ar,Ss,or,!1,vs);if(o===null&&(lr(Ss.set(-.5,.5,0),Yi,a,qi,s,r),Ca.set(0,1),o=t.ray.intersectTriangle(ar,or,Ss,!1,vs),o===null))return;const l=t.ray.origin.distanceTo(vs);l<t.near||l>t.far||e.push({distance:l,point:vs.clone(),uv:Mn.getInterpolation(vs,ar,Ss,or,Xl,Ca,ql,new at),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}toJSON(t){const e=super.toJSON(t);return e.object.center=this.center.toArray(),e}}function lr(i,t,e,n,s,r){Zi.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Ms.x=r*Zi.x-s*Zi.y,Ms.y=s*Zi.x+r*Zi.y):Ms.copy(Zi),i.copy(t),i.x+=Ms.x,i.y+=Ms.y,i.applyMatrix4(Sh)}const $n=new P,Pa=new P,cr=new P,hr=new P;class yh{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,$n)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=$n.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):($n.copy(this.origin).addScaledVector(this.direction,e),$n.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Pa.copy(t).add(e).multiplyScalar(.5),cr.copy(e).sub(t).normalize(),hr.copy(this.origin).sub(Pa);const r=t.distanceTo(e)*.5,a=-this.direction.dot(cr),o=hr.dot(this.direction),l=-hr.dot(cr),c=hr.lengthSq(),h=Math.abs(1-a*a);let u,f,d,p;if(h>0)if(u=a*l-o,f=a*o-l,p=r*h,u>=0)if(f>=-p)if(f<=p){const _=1/h;u*=_,f*=_,d=u*(u+a*f+2*o)+f*(a*u+f+2*l)+c}else f=r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f<=-p?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c):f<=p?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Pa).addScaledVector(cr,f),d}intersectSphere(t,e){if(t.radius<0)return null;$n.subVectors(t.center,this.origin);const n=$n.dot(this.direction),s=$n.dot($n)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,$n)!==null}intersectTriangle(t,e,n,s,r){const a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,u=t.x-a.x,f=t.y-a.y,d=t.z-a.z,p=e.x-a.x,_=e.y-a.y,m=e.z-a.z,g=n.x-a.x,v=n.y-a.y,b=n.z-a.z,S=Math.abs(l),T=Math.abs(c),w=Math.abs(h);let x,M,C,A,I,N,F,L,z,X,G,it;if(S>=T&&S>=w?(C=l,N=u,z=p,it=g,l>=0?(x=c,M=h,A=f,I=d,F=_,L=m,X=v,G=b):(x=h,M=c,A=d,I=f,F=m,L=_,X=b,G=v)):T>=w?(C=c,N=f,z=_,it=v,c>=0?(x=h,M=l,A=d,I=u,F=m,L=p,X=b,G=g):(x=l,M=h,A=u,I=d,F=p,L=m,X=g,G=b)):(C=h,N=d,z=m,it=b,h>=0?(x=l,M=c,A=u,I=f,F=p,L=_,X=g,G=v):(x=c,M=l,A=f,I=u,F=_,L=p,X=v,G=g)),C===0)return null;const q=x/C,tt=M/C,nt=1/C,Tt=A-q*N,Gt=I-tt*N,Z=F-q*z,vt=L-tt*z,At=X-q*it,Ft=G-tt*it,Mt=At*vt-Ft*Z,Bt=Tt*Ft-Gt*At,Te=Z*Gt-vt*Tt;if(s){if(Mt<0||Bt<0||Te<0)return null}else if((Mt<0||Bt<0||Te<0)&&(Mt>0||Bt>0||Te>0))return null;const Ht=Mt+Bt+Te;if(Ht===0)return null;const ee=nt*(Mt*N+Bt*z+Te*it);return(Ht>0?ee<0:ee>0)?null:this.at(ee/Ht,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class he extends Ni{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Jt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xi,this.combine=Jc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Yl=new _e,bi=new yh,ur=new fs,Zl=new P,fr=new P,dr=new P,pr=new P,La=new P,mr=new P,$l=new P,gr=new P;class K extends Ne{constructor(t=new He,e=new he){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){mr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(La.fromBufferAttribute(u,t),a?mr.addScaledVector(La,h):mr.addScaledVector(La.sub(e),h))}e.add(mr)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ur.copy(n.boundingSphere),ur.applyMatrix4(r),bi.copy(t.ray).recast(t.near),!(ur.containsPoint(bi.origin)===!1&&(bi.intersectSphere(ur,Zl)===null||bi.origin.distanceToSquared(Zl)>(t.far-t.near)**2))&&(Yl.copy(r).invert(),bi.copy(t.ray).applyMatrix4(Yl),!(n.boundingBox!==null&&bi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,bi)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,_=f.length;p<_;p++){const m=f[p],g=a[m.materialIndex],v=Math.max(m.start,d.start),b=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let S=v,T=b;S<T;S+=3){const w=o.getX(S),x=o.getX(S+1),M=o.getX(S+2);s=xr(this,g,t,n,c,h,u,w,x,M),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const p=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let m=p,g=_;m<g;m+=3){const v=o.getX(m),b=o.getX(m+1),S=o.getX(m+2);s=xr(this,a,t,n,c,h,u,v,b,S),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,_=f.length;p<_;p++){const m=f[p],g=a[m.materialIndex],v=Math.max(m.start,d.start),b=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let S=v,T=b;S<T;S+=3){const w=S,x=S+1,M=S+2;s=xr(this,g,t,n,c,h,u,w,x,M),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const p=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let m=p,g=_;m<g;m+=3){const v=m,b=m+1,S=m+2;s=xr(this,a,t,n,c,h,u,v,b,S),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function zf(i,t,e,n,s,r,a,o){let l;if(t.side===cn?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===Ai,o),l===null)return null;gr.copy(o),gr.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(gr);return c<e.near||c>e.far?null:{distance:c,point:gr.clone(),object:i}}function xr(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,fr),i.getVertexPosition(l,dr),i.getVertexPosition(c,pr);const h=zf(i,t,e,n,fr,dr,pr,$l);if(h){const u=new P;Mn.getBarycoord($l,fr,dr,pr,u),s&&(h.uv=Mn.getInterpolatedAttribute(s,o,l,c,u,new at)),r&&(h.uv1=Mn.getInterpolatedAttribute(r,o,l,c,u,new at)),a&&(h.normal=Mn.getInterpolatedAttribute(a,o,l,c,u,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new P,materialIndex:0};Mn.getNormal(fr,dr,pr,f.normal),h.face=f,h.barycoord=u}return h}class Eh extends en{constructor(t=null,e=1,n=1,s,r,a,o,l,c=$e,h=$e,u,f){super(null,a,o,l,c,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Jl extends Ln{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const $i=new _e,Kl=new _e,_r=[],Ql=new Di,Gf=new _e,ys=new K,Es=new fs;class jl extends K{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Jl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Gf)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Di),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,$i),Ql.copy(t.boundingBox).applyMatrix4($i),this.boundingBox.union(Ql)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new fs),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,$i),Es.copy(t.boundingSphere).applyMatrix4($i),this.boundingSphere.union(Es)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),this.morphTexture=t.morphTexture!==null?t.morphTexture.clone():null,this.instanceColor=t.instanceColor!==null?t.instanceColor.clone():null,this.count=t.count,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(ys.geometry=this.geometry,ys.material=this.material,ys.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Es.copy(this.boundingSphere),Es.applyMatrix4(n),t.ray.intersectsSphere(Es)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,$i),Kl.multiplyMatrices(n,$i),ys.matrixWorld=Kl,ys.raycast(t,_r);for(let a=0,o=_r.length;a<o;a++){const l=_r[a];l.instanceId=r,l.object=this,e.push(l)}_r.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Jl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Eh(new Float32Array(s*this.count),s,this.count,Vo,Rn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const wi=new fs,kf=new at(.5,.5),vr=new P;class zs{constructor(t=new fi,e=new fi,n=new fi,s=new fi,r=new fi,a=new fi){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Cn,n=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],u=r[5],f=r[6],d=r[7],p=r[8],_=r[9],m=r[10],g=r[11],v=r[12],b=r[13],S=r[14],T=r[15];if(s[0].setComponents(c-a,d-h,g-p,T-v).normalize(),s[1].setComponents(c+a,d+h,g+p,T+v).normalize(),s[2].setComponents(c+o,d+u,g+_,T+b).normalize(),s[3].setComponents(c-o,d-u,g-_,T-b).normalize(),n)s[4].setComponents(l,f,m,S).normalize(),s[5].setComponents(c-l,d-f,g-m,T-S).normalize();else if(s[4].setComponents(c-l,d-f,g-m,T-S).normalize(),e===Cn)s[5].setComponents(c+l,d+f,g+m,T+S).normalize();else if(e===Bs)s[5].setComponents(l,f,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),wi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),wi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(wi)}intersectsSprite(t){wi.center.set(0,0,0);const e=kf.distanceTo(t.center);return wi.radius=.7071067811865476+e,wi.applyMatrix4(t.matrixWorld),this.intersectsSphere(wi)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(vr.x=s.normal.x>0?t.max.x:t.min.x,vr.y=s.normal.y>0?t.max.y:t.min.y,vr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(vr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const tc=new _e;class Qo{constructor(){this.coordinateSystem=Cn,this._frustums=[],this._count=0}setFromArrayCamera(t){const e=t.cameras,n=this._frustums;for(let s=0;s<e.length;s++){const r=e[s];tc.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new zs),n[s].setFromProjectionMatrix(tc,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;const e=this._frustums,n=t._frustums;for(let s=0;s<t._count;s++)e[s]===void 0&&(e[s]=new zs),e[s].copy(n[s]);return this._count=t._count,this}clone(){return new Qo().copy(this)}}class bh extends Ni{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Jt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const ec=new _e,Ro=new yh,Mr=new fs,Sr=new P;class Hf extends Ne{constructor(t=new He,e=new bh){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Mr.copy(n.boundingSphere),Mr.applyMatrix4(s),Mr.radius+=r,t.ray.intersectsSphere(Mr)===!1)return;ec.copy(s).invert(),Ro.copy(t.ray).applyMatrix4(ec);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const f=Math.max(0,a.start),d=Math.min(c.count,a.start+a.count);for(let p=f,_=d;p<_;p++){const m=c.getX(p);Sr.fromBufferAttribute(u,m),nc(Sr,m,l,s,t,e,this)}}else{const f=Math.max(0,a.start),d=Math.min(u.count,a.start+a.count);for(let p=f,_=d;p<_;p++)Sr.fromBufferAttribute(u,p),nc(Sr,p,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function nc(i,t,e,n,s,r,a){const o=Ro.distanceSqToPoint(i);if(o<e){const l=new P;Ro.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class wh extends en{constructor(t=[],e=ss,n,s,r,a,o,l,c,h){super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Th extends en{constructor(t,e,n,s,r,a,o,l,c){super(t,e,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ls extends en{constructor(t,e,n=Gn,s,r,a,o=$e,l=$e,c,h=gi,u=1){if(h!==gi&&h!==mi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:u};super(f,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Jo(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}}class Ah extends ls{constructor(t,e=Gn,n=ss,s,r,a=$e,o=$e,l,c=gi){const h={width:t,height:t,depth:1},u=[h,h,h,h,h,h];super(t,t,e,n,s,r,a,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Rh extends en{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Ut extends He{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let f=0,d=0;p("z","y","x",-1,-1,n,e,t,a,r,0),p("z","y","x",1,-1,n,e,-t,a,r,1),p("x","z","y",1,1,t,n,e,s,a,2),p("x","z","y",1,-1,t,n,-e,s,a,3),p("x","y","z",1,-1,t,e,n,s,r,4),p("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new ve(c,3)),this.setAttribute("normal",new ve(h,3)),this.setAttribute("uv",new ve(u,2));function p(_,m,g,v,b,S,T,w,x,M,C){const A=S/x,I=T/M,N=S/2,F=T/2,L=w/2,z=x+1,X=M+1;let G=0,it=0;const q=new P;for(let tt=0;tt<X;tt++){const nt=tt*I-F;for(let Tt=0;Tt<z;Tt++){const Gt=Tt*A-N;q[_]=Gt*v,q[m]=nt*b,q[g]=L,c.push(q.x,q.y,q.z),q[_]=0,q[m]=0,q[g]=w>0?1:-1,h.push(q.x,q.y,q.z),u.push(Tt/x),u.push(1-tt/M),G+=1}}for(let tt=0;tt<M;tt++)for(let nt=0;nt<x;nt++){const Tt=f+nt+z*tt,Gt=f+nt+z*(tt+1),Z=f+(nt+1)+z*(tt+1),vt=f+(nt+1)+z*tt;l.push(Tt,Gt,vt),l.push(Gt,Z,vt),it+=6}o.addGroup(d,it,C),d+=it,f+=G}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ut(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Xs extends He{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],l=[],c=new P,h=new at;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){const d=n+u/e*s;c.x=t*Math.cos(d),c.y=t*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[f]/t+1)/2,h.y=(a[f+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new ve(a,3)),this.setAttribute("normal",new ve(o,3)),this.setAttribute("uv",new ve(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xs(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Ie extends He{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],d=[];let p=0;const _=[],m=n/2;let g=0;v(),a===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(h),this.setAttribute("position",new ve(u,3)),this.setAttribute("normal",new ve(f,3)),this.setAttribute("uv",new ve(d,2));function v(){const S=new P,T=new P;let w=0;const x=(e-t)/n;for(let M=0;M<=r;M++){const C=[],A=M/r,I=A*(e-t)+t;for(let N=0;N<=s;N++){const F=N/s,L=F*l+o,z=Math.sin(L),X=Math.cos(L);T.x=I*z,T.y=-A*n+m,T.z=I*X,u.push(T.x,T.y,T.z),S.set(z,x,X).normalize(),f.push(S.x,S.y,S.z),d.push(F,1-A),C.push(p++)}_.push(C)}for(let M=0;M<s;M++)for(let C=0;C<r;C++){const A=_[C][M],I=_[C+1][M],N=_[C+1][M+1],F=_[C][M+1];(t>0||C!==0)&&(h.push(A,I,F),w+=3),(e>0||C!==r-1)&&(h.push(I,N,F),w+=3)}c.addGroup(g,w,0),g+=w}function b(S){const T=p,w=new at,x=new P;let M=0;const C=S===!0?t:e,A=S===!0?1:-1;for(let N=1;N<=s;N++)u.push(0,m*A,0),f.push(0,A,0),d.push(.5,.5),p++;const I=p;for(let N=0;N<=s;N++){const L=N/s*l+o,z=Math.cos(L),X=Math.sin(L);x.x=C*X,x.y=m*A,x.z=C*z,u.push(x.x,x.y,x.z),f.push(0,A,0),w.x=z*.5+.5,w.y=X*.5*A+.5,d.push(w.x,w.y),p++}for(let N=0;N<s;N++){const F=T+N,L=I+N;S===!0?h.push(L,L+1,F):h.push(L+1,L,F),M+=3}c.addGroup(g,M,S===!0?1:2),g+=M}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ie(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Gs extends Ie{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new Gs(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class jo extends He{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],a=[];o(s),c(n),h(),this.setAttribute("position",new ve(r,3)),this.setAttribute("normal",new ve(r.slice(),3)),this.setAttribute("uv",new ve(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(v){const b=new P,S=new P,T=new P;for(let w=0;w<e.length;w+=3)d(e[w+0],b),d(e[w+1],S),d(e[w+2],T),l(b,S,T,v)}function l(v,b,S,T){const w=T+1,x=[];for(let M=0;M<=w;M++){x[M]=[];const C=v.clone().lerp(S,M/w),A=b.clone().lerp(S,M/w),I=w-M;for(let N=0;N<=I;N++)N===0&&M===w?x[M][N]=C:x[M][N]=C.clone().lerp(A,N/I)}for(let M=0;M<w;M++)for(let C=0;C<2*(w-M)-1;C++){const A=Math.floor(C/2);C%2===0?(f(x[M][A+1]),f(x[M+1][A]),f(x[M][A])):(f(x[M][A+1]),f(x[M+1][A+1]),f(x[M+1][A]))}}function c(v){const b=new P;for(let S=0;S<r.length;S+=3)b.x=r[S+0],b.y=r[S+1],b.z=r[S+2],b.normalize().multiplyScalar(v),r[S+0]=b.x,r[S+1]=b.y,r[S+2]=b.z}function h(){const v=new P;for(let b=0;b<r.length;b+=3){v.x=r[b+0],v.y=r[b+1],v.z=r[b+2];const S=m(v)/2/Math.PI+.5,T=g(v)/Math.PI+.5;a.push(S,1-T)}p(),u()}function u(){for(let v=0;v<a.length;v+=6){const b=a[v+0],S=a[v+2],T=a[v+4],w=Math.max(b,S,T),x=Math.min(b,S,T);w>.9&&x<.1&&(b<.2&&(a[v+0]+=1),S<.2&&(a[v+2]+=1),T<.2&&(a[v+4]+=1))}}function f(v){r.push(v.x,v.y,v.z)}function d(v,b){const S=v*3;b.x=t[S+0],b.y=t[S+1],b.z=t[S+2]}function p(){const v=new P,b=new P,S=new P,T=new P,w=new at,x=new at,M=new at;for(let C=0,A=0;C<r.length;C+=9,A+=6){v.set(r[C+0],r[C+1],r[C+2]),b.set(r[C+3],r[C+4],r[C+5]),S.set(r[C+6],r[C+7],r[C+8]),w.set(a[A+0],a[A+1]),x.set(a[A+2],a[A+3]),M.set(a[A+4],a[A+5]),T.copy(v).add(b).add(S).divideScalar(3);const I=m(T);_(w,A+0,v,I),_(x,A+2,b,I),_(M,A+4,S,I)}}function _(v,b,S,T){T<0&&v.x===1&&(a[b]=v.x-1),S.x===0&&S.z===0&&(a[b]=T/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function g(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new jo(t.vertices,t.indices,t.radius,t.detail)}}class Vn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Xt("Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);const h=n[s],f=n[s+1]-h,d=(a-h)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new at:new P);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new P,s=[],r=[],a=[],o=new P,l=new _e;for(let d=0;d<=t;d++){const p=d/t;s[d]=this.getTangentAt(p,new P)}r[0]=new P,a[0]=new P;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(s[d-1],s[d]),o.length()>Number.EPSILON){o.normalize();const p=Math.acos(ne(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(o,p))}a[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(ne(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let p=1;p<=t;p++)r[p].applyMatrix4(l.makeRotationAxis(s[p],d*p)),a[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}}class tl extends Vn{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new at){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*h-d*u+this.aX,c=f*u+d*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Vf extends tl{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function el(){let i=0,t=0,e=0,n=0;function s(r,a,o,l){i=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let f=(a-r)/c-(o-r)/(c+h)+(o-a)/h,d=(o-a)/h-(l-a)/(h+u)+(l-o)/u;f*=h,d*=h,s(a,o,f,d)},calc:function(r){const a=r*r,o=a*r;return i+t*r+e*a+n*o}}}const ic=new P,sc=new P,Ia=new el,Da=new el,Na=new el;class Wf extends Vn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new P){const n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(sc.subVectors(s[0],s[1]).add(s[0]),c=sc);const u=s[o%r],f=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(ic.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=ic),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let p=Math.pow(c.distanceToSquared(u),d),_=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(h),d);_<1e-4&&(_=1),p<1e-4&&(p=_),m<1e-4&&(m=_),Ia.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,p,_,m),Da.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,p,_,m),Na.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,p,_,m)}else this.curveType==="catmullrom"&&(Ia.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),Da.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),Na.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return n.set(Ia.calc(l),Da.calc(l),Na.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new P().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function rc(i,t,e,n,s){const r=(n-t)*.5,a=(s-e)*.5,o=i*i,l=i*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*i+e}function Xf(i,t){const e=1-i;return e*e*t}function qf(i,t){return 2*(1-i)*i*t}function Yf(i,t){return i*i*t}function Is(i,t,e,n){return Xf(i,t)+qf(i,e)+Yf(i,n)}function Zf(i,t){const e=1-i;return e*e*e*t}function $f(i,t){const e=1-i;return 3*e*e*i*t}function Jf(i,t){return 3*(1-i)*i*i*t}function Kf(i,t){return i*i*i*t}function Ds(i,t,e,n,s){return Zf(i,t)+$f(i,e)+Jf(i,n)+Kf(i,s)}class Ch extends Vn{constructor(t=new at,e=new at,n=new at,s=new at){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new at){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ds(t,s.x,r.x,a.x,o.x),Ds(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Qf extends Vn{constructor(t=new P,e=new P,n=new P,s=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new P){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ds(t,s.x,r.x,a.x,o.x),Ds(t,s.y,r.y,a.y,o.y),Ds(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Ph extends Vn{constructor(t=new at,e=new at){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new at){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new at){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class jf extends Vn{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Lh extends Vn{constructor(t=new at,e=new at,n=new at){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new at){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Is(t,s.x,r.x,a.x),Is(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class td extends Vn{constructor(t=new P,e=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new P){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Is(t,s.x,r.x,a.x),Is(t,s.y,r.y,a.y),Is(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ih extends Vn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new at){const n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return n.set(rc(o,l.x,c.x,h.x,u.x),rc(o,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new at().fromArray(s))}return this}}var Co=Object.freeze({__proto__:null,ArcCurve:Vf,CatmullRomCurve3:Wf,CubicBezierCurve:Ch,CubicBezierCurve3:Qf,EllipseCurve:tl,LineCurve:Ph,LineCurve3:jf,QuadraticBezierCurve:Lh,QuadraticBezierCurve3:td,SplineCurve:Ih});class ed extends Vn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Co[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this.cacheLengths=null,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new Co[s.type]().fromJSON(s))}return this.cacheLengths=null,this}}class ac extends ed{constructor(t){super(),this.type="Path",this.currentPoint=new at,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Ph(this.currentPoint.clone(),new at(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new Lh(this.currentPoint.clone(),new at(t,e),new at(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){const o=new Ch(this.currentPoint.clone(),new at(t,e),new at(n,s),new at(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Ih(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,a,o,l),this}absellipse(t,e,n,s,r,a,o,l){const c=new tl(t,e,n,s,r,a,o,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class nl extends ac{constructor(t){super(t),this.uuid=si(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new ac().fromJSON(s))}return this}}function nd(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=Dh(i,0,s,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=od(i,t,r,e)),i.length>80*e){o=i[0],l=i[1];let h=o,u=l;for(let f=e;f<s;f+=e){const d=i[f],p=i[f+1];d<o&&(o=d),p<l&&(l=p),d>h&&(h=d),p>u&&(u=p)}c=Math.max(h-o,u-l),c=c!==0?32767/c:0}return ks(r,a,e,o,l,c,0),a}function Dh(i,t,e,n,s){let r;if(s===_d(i,t,e,n)>0)for(let a=t;a<e;a+=n)r=oc(a/n|0,i[a],i[a+1],r);else for(let a=e-n;a>=t;a-=n)r=oc(a/n|0,i[a],i[a+1],r);return r&&cs(r,r.next)&&(Vs(r),r=r.next),r}function Ci(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(cs(e,e.next)||Le(e.prev,e,e.next)===0)){if(Vs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function ks(i,t,e,n,s,r,a){if(!i)return;!a&&r&&fd(i,n,s,r);let o=i;for(;i.prev!==i.next;){const l=i.prev,c=i.next;if(r?sd(i,n,s,r):id(i)){t.push(l.i,i.i,c.i),Vs(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=rd(Ci(i),t),ks(i,t,e,n,s,r,2)):a===2&&ad(i,t,e,n,s,r):ks(Ci(i),t,e,n,s,r,1);break}}}function id(i){const t=i.prev,e=i,n=i.next;if(Le(t,e,n)>=0)return!1;const s=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=Math.min(s,r,a),u=Math.min(o,l,c),f=Math.max(s,r,a),d=Math.max(o,l,c);let p=n.next;for(;p!==t;){if(p.x>=h&&p.x<=f&&p.y>=u&&p.y<=d&&Rs(s,o,r,l,a,c,p.x,p.y)&&Le(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function sd(i,t,e,n){const s=i.prev,r=i,a=i.next;if(Le(s,r,a)>=0)return!1;const o=s.x,l=r.x,c=a.x,h=s.y,u=r.y,f=a.y,d=Math.min(o,l,c),p=Math.min(h,u,f),_=Math.max(o,l,c),m=Math.max(h,u,f),g=Po(d,p,t,e,n),v=Po(_,m,t,e,n);let b=i.prevZ,S=i.nextZ;for(;b&&b.z>=g&&S&&S.z<=v;){if(b.x>=d&&b.x<=_&&b.y>=p&&b.y<=m&&b!==s&&b!==a&&Rs(o,h,l,u,c,f,b.x,b.y)&&Le(b.prev,b,b.next)>=0||(b=b.prevZ,S.x>=d&&S.x<=_&&S.y>=p&&S.y<=m&&S!==s&&S!==a&&Rs(o,h,l,u,c,f,S.x,S.y)&&Le(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;b&&b.z>=g;){if(b.x>=d&&b.x<=_&&b.y>=p&&b.y<=m&&b!==s&&b!==a&&Rs(o,h,l,u,c,f,b.x,b.y)&&Le(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;S&&S.z<=v;){if(S.x>=d&&S.x<=_&&S.y>=p&&S.y<=m&&S!==s&&S!==a&&Rs(o,h,l,u,c,f,S.x,S.y)&&Le(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function rd(i,t){let e=i;do{const n=e.prev,s=e.next.next;!cs(n,s)&&Uh(n,e,e.next,s)&&Hs(n,s)&&Hs(s,n)&&(t.push(n.i,e.i,s.i),Vs(e),Vs(e.next),e=i=s),e=e.next}while(e!==i);return Ci(e)}function ad(i,t,e,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&md(a,o)){let l=Oh(a,o);a=Ci(a,a.next),l=Ci(l,l.next),ks(a,t,e,n,s,r,0),ks(l,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function od(i,t,e,n){const s=[];for(let r=0,a=t.length;r<a;r++){const o=t[r]*n,l=r<a-1?t[r+1]*n:i.length,c=Dh(i,o,l,n,!1);c===c.next&&(c.steiner=!0),s.push(pd(c))}s.sort(ld);for(let r=0;r<s.length;r++)e=cd(s[r],e);return e}function ld(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function cd(i,t){const e=hd(i,t);if(!e)return t;const n=Oh(e,i);return Ci(n,n.next),Ci(e,e.next)}function hd(i,t){let e=t;const n=i.x,s=i.y;let r=-1/0,a;if(cs(i,e))return e;do{if(cs(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){const u=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>r&&(r=u,a=e.x<e.next.x?e:e.next,u===n))return a}e=e.next}while(e!==t);if(!a)return null;const o=a,l=a.x,c=a.y;let h=1/0;e=a;do{if(n>=e.x&&e.x>=l&&n!==e.x&&Nh(s<c?n:r,s,l,c,s<c?r:n,s,e.x,e.y)){const u=Math.abs(s-e.y)/(n-e.x);Hs(e,i)&&(u<h||u===h&&(e.x>a.x||e.x===a.x&&ud(a,e)))&&(a=e,h=u)}e=e.next}while(e!==o);return a}function ud(i,t){return Le(i.prev,i,t.prev)<0&&Le(t.next,i,i.next)<0}function fd(i,t,e,n){let s=i;do s.z===0&&(s.z=Po(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,dd(s)}function dd(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,e*=2}while(t>1);return i}function Po(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function pd(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Nh(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function Rs(i,t,e,n,s,r,a,o){return!(i===a&&t===o)&&Nh(i,t,e,n,s,r,a,o)}function md(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!gd(i,t)&&(Hs(i,t)&&Hs(t,i)&&xd(i,t)&&(Le(i.prev,i,t.prev)||Le(i,t.prev,t))||cs(i,t)&&Le(i.prev,i,i.next)>0&&Le(t.prev,t,t.next)>0)}function Le(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function cs(i,t){return i.x===t.x&&i.y===t.y}function Uh(i,t,e,n){const s=Er(Le(i,t,e)),r=Er(Le(i,t,n)),a=Er(Le(e,n,i)),o=Er(Le(e,n,t));return!!(s!==r&&a!==o||s===0&&yr(i,e,t)||r===0&&yr(i,n,t)||a===0&&yr(e,i,n)||o===0&&yr(e,t,n))}function yr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Er(i){return i>0?1:i<0?-1:0}function gd(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Uh(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Hs(i,t){return Le(i.prev,i,i.next)<0?Le(i,t,i.next)>=0&&Le(i,i.prev,t)>=0:Le(i,t,i.prev)<0||Le(i,i.next,t)<0}function xd(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Oh(i,t){const e=Lo(i.i,i.x,i.y),n=Lo(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function oc(i,t,e,n){const s=Lo(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Vs(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Lo(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function _d(i,t,e,n){let s=0;for(let r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class vd{static triangulate(t,e,n=2){return nd(t,e,n)}}class ji{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return ji.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];lc(t),cc(n,t);let a=t.length;e.forEach(lc);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,cc(n,e[l]);const o=vd.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function lc(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function cc(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class Jr extends He{constructor(t=new nl([new at(.5,.5),new at(-.5,.5),new at(-.5,-.5),new at(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let o=0,l=t.length;o<l;o++){const c=t[o];a(c)}this.setAttribute("position",new ve(s,3)),this.setAttribute("uv",new ve(r,2)),this.computeVertexNormals();function a(o){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,p=e.bevelSize!==void 0?e.bevelSize:d-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const g=e.extrudePath,v=e.UVGenerator!==void 0?e.UVGenerator:Md;let b,S=!1,T,w,x,M;if(g){b=g.getSpacedPoints(h),S=!0,f=!1;const et=g.isCatmullRomCurve3?g.closed:!1;T=g.computeFrenetFrames(h,et),w=new P,x=new P,M=new P}f||(m=0,d=0,p=0,_=0);const C=o.extractPoints(c);let A=C.shape;const I=C.holes;if(!ji.isClockWise(A)){A=A.reverse();for(let et=0,ut=I.length;et<ut;et++){const lt=I[et];ji.isClockWise(lt)&&(I[et]=lt.reverse())}}function F(et){const lt=10000000000000001e-36;let wt=et[0];for(let _t=1;_t<=et.length;_t++){const Kt=_t%et.length,It=et[Kt],re=It.x-wt.x,ae=It.y-wt.y,de=re*re+ae*ae,O=Math.max(Math.abs(It.x),Math.abs(It.y),Math.abs(wt.x),Math.abs(wt.y)),Ue=lt*O*O;if(de<=Ue){et.splice(Kt,1),_t--;continue}wt=It}}F(A),I.forEach(F);const L=I.length,z=A;for(let et=0;et<L;et++){const ut=I[et];A=A.concat(ut)}function X(et,ut,lt){return ut||fe("ExtrudeGeometry: vec does not exist"),et.clone().addScaledVector(ut,lt)}const G=A.length;function it(et,ut,lt){let wt,_t,Kt;const It=et.x-ut.x,re=et.y-ut.y,ae=lt.x-et.x,de=lt.y-et.y,O=It*It+re*re,Ue=It*de-re*ae;if(Math.abs(Ue)>Number.EPSILON){const ie=Math.sqrt(O),ye=Math.sqrt(ae*ae+de*de),mt=ut.x-re/ie,De=ut.y+It/ie,zt=lt.x-de/ye,qt=lt.y+ae/ye,R=((zt-mt)*de-(qt-De)*ae)/(It*de-re*ae);wt=mt+It*R-et.x,_t=De+re*R-et.y;const y=wt*wt+_t*_t;if(y<=2)return new at(wt,_t);Kt=Math.sqrt(y/2)}else{let ie=!1;It>Number.EPSILON?ae>Number.EPSILON&&(ie=!0):It<-Number.EPSILON?ae<-Number.EPSILON&&(ie=!0):Math.sign(re)===Math.sign(de)&&(ie=!0),ie?(wt=-re,_t=It,Kt=Math.sqrt(O)):(wt=It,_t=re,Kt=Math.sqrt(O/2))}return new at(wt/Kt,_t/Kt)}const q=[];for(let et=0,ut=z.length,lt=ut-1,wt=et+1;et<ut;et++,lt++,wt++)lt===ut&&(lt=0),wt===ut&&(wt=0),q[et]=it(z[et],z[lt],z[wt]);const tt=[];let nt,Tt=q.concat();for(let et=0,ut=L;et<ut;et++){const lt=I[et];nt=[];for(let wt=0,_t=lt.length,Kt=_t-1,It=wt+1;wt<_t;wt++,Kt++,It++)Kt===_t&&(Kt=0),It===_t&&(It=0),nt[wt]=it(lt[wt],lt[Kt],lt[It]);tt.push(nt),Tt=Tt.concat(nt)}let Gt;if(m===0)Gt=ji.triangulateShape(z,I);else{const et=[],ut=[];for(let lt=0;lt<m;lt++){const wt=lt/m,_t=d*Math.cos(wt*Math.PI/2),Kt=p*Math.sin(wt*Math.PI/2)+_;for(let It=0,re=z.length;It<re;It++){const ae=X(z[It],q[It],Kt);Bt(ae.x,ae.y,-_t),wt===0&&et.push(ae)}for(let It=0,re=L;It<re;It++){const ae=I[It];nt=tt[It];const de=[];for(let O=0,Ue=ae.length;O<Ue;O++){const ie=X(ae[O],nt[O],Kt);Bt(ie.x,ie.y,-_t),wt===0&&de.push(ie)}wt===0&&ut.push(de)}}Gt=ji.triangulateShape(et,ut)}const Z=Gt.length,vt=p+_;for(let et=0;et<G;et++){const ut=f?X(A[et],Tt[et],vt):A[et];S?(x.copy(T.normals[0]).multiplyScalar(ut.x),w.copy(T.binormals[0]).multiplyScalar(ut.y),M.copy(b[0]).add(x).add(w),Bt(M.x,M.y,M.z)):Bt(ut.x,ut.y,0)}for(let et=1;et<=h;et++)for(let ut=0;ut<G;ut++){const lt=f?X(A[ut],Tt[ut],vt):A[ut];S?(x.copy(T.normals[et]).multiplyScalar(lt.x),w.copy(T.binormals[et]).multiplyScalar(lt.y),M.copy(b[et]).add(x).add(w),Bt(M.x,M.y,M.z)):Bt(lt.x,lt.y,u/h*et)}for(let et=m-1;et>=0;et--){const ut=et/m,lt=d*Math.cos(ut*Math.PI/2),wt=p*Math.sin(ut*Math.PI/2)+_;for(let _t=0,Kt=z.length;_t<Kt;_t++){const It=X(z[_t],q[_t],wt);Bt(It.x,It.y,u+lt)}for(let _t=0,Kt=I.length;_t<Kt;_t++){const It=I[_t];nt=tt[_t];for(let re=0,ae=It.length;re<ae;re++){const de=X(It[re],nt[re],wt);S?Bt(de.x,de.y+b[h-1].y,b[h-1].x+lt):Bt(de.x,de.y,u+lt)}}}At(),Ft();function At(){const et=s.length/3;if(f){let ut=0,lt=G*ut;for(let wt=0;wt<Z;wt++){const _t=Gt[wt];Te(_t[2]+lt,_t[1]+lt,_t[0]+lt)}ut=h+m*2,lt=G*ut;for(let wt=0;wt<Z;wt++){const _t=Gt[wt];Te(_t[0]+lt,_t[1]+lt,_t[2]+lt)}}else{for(let ut=0;ut<Z;ut++){const lt=Gt[ut];Te(lt[2],lt[1],lt[0])}for(let ut=0;ut<Z;ut++){const lt=Gt[ut];Te(lt[0]+G*h,lt[1]+G*h,lt[2]+G*h)}}n.addGroup(et,s.length/3-et,0)}function Ft(){const et=s.length/3;let ut=0;Mt(z,ut),ut+=z.length;for(let lt=0,wt=I.length;lt<wt;lt++){const _t=I[lt];Mt(_t,ut),ut+=_t.length}n.addGroup(et,s.length/3-et,1)}function Mt(et,ut){let lt=et.length;for(;--lt>=0;){const wt=lt;let _t=lt-1;_t<0&&(_t=et.length-1);for(let Kt=0,It=h+m*2;Kt<It;Kt++){const re=G*Kt,ae=G*(Kt+1),de=ut+wt+re,O=ut+_t+re,Ue=ut+_t+ae,ie=ut+wt+ae;Ht(de,O,Ue,ie)}}}function Bt(et,ut,lt){l.push(et),l.push(ut),l.push(lt)}function Te(et,ut,lt){ee(et),ee(ut),ee(lt);const wt=s.length/3,_t=v.generateTopUV(n,s,wt-3,wt-2,wt-1);se(_t[0]),se(_t[1]),se(_t[2])}function Ht(et,ut,lt,wt){ee(et),ee(ut),ee(wt),ee(ut),ee(lt),ee(wt);const _t=s.length/3,Kt=v.generateSideWallUV(n,s,_t-6,_t-3,_t-2,_t-1);se(Kt[0]),se(Kt[1]),se(Kt[3]),se(Kt[1]),se(Kt[2]),se(Kt[3])}function ee(et){s.push(l[et*3+0]),s.push(l[et*3+1]),s.push(l[et*3+2])}function se(et){r.push(et.x),r.push(et.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Sd(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,a=t.shapes.length;r<a;r++){const o=e[t.shapes[r]];n.push(o)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Co[s.type]().fromJSON(s)),new Jr(n,t.options)}}const Md={generateTopUV:function(i,t,e,n,s){const r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new at(r,a),new at(o,l),new at(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){const a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],f=t[s*3],d=t[s*3+1],p=t[s*3+2],_=t[r*3],m=t[r*3+1],g=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new at(a,1-l),new at(c,1-u),new at(f,1-p),new at(_,1-g)]:[new at(o,1-l),new at(h,1-u),new at(d,1-p),new at(m,1-g)]}};function Sd(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Kr extends jo{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Kr(t.radius,t.detail)}}class Ze extends He{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,u=t/o,f=e/l,d=[],p=[],_=[],m=[];for(let g=0;g<h;g++){const v=g*f-a;for(let b=0;b<c;b++){const S=b*u-r;p.push(S,-v,0),_.push(0,0,1),m.push(b/o),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let v=0;v<o;v++){const b=v+c*g,S=v+c*(g+1),T=v+1+c*(g+1),w=v+1+c*g;d.push(b,S,w),d.push(S,T,w)}this.setIndex(d),this.setAttribute("position",new ve(p,3)),this.setAttribute("normal",new ve(_,3)),this.setAttribute("uv",new ve(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ze(t.width,t.height,t.widthSegments,t.heightSegments)}}class hs extends He{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],l=[],c=[],h=[];let u=t;const f=(e-t)/s,d=new P,p=new at;for(let _=0;_<=s;_++){for(let m=0;m<=n;m++){const g=r+m/n*a;d.x=u*Math.cos(g),d.y=u*Math.sin(g),l.push(d.x,d.y,d.z),c.push(0,0,1),p.x=(d.x/e+1)/2,p.y=(d.y/e+1)/2,h.push(p.x,p.y)}u+=f}for(let _=0;_<s;_++){const m=_*(n+1);for(let g=0;g<n;g++){const v=g+m,b=v,S=v+n+1,T=v+n+2,w=v+1;o.push(b,S,w),o.push(S,T,w)}}this.setIndex(o),this.setAttribute("position",new ve(l,3)),this.setAttribute("normal",new ve(c,3)),this.setAttribute("uv",new ve(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hs(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Pn extends He{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new P,f=new P,d=[],p=[],_=[],m=[];for(let g=0;g<=n;g++){const v=[],b=g/n,S=a+b*o,T=t*Math.cos(S),w=Math.sqrt(t*t-T*T);let x=0;g===0&&a===0?x=.5/e:g===n&&l===Math.PI&&(x=-.5/e);for(let M=0;M<=e;M++){const C=M/e,A=s+C*r;u.x=-w*Math.cos(A),u.y=T,u.z=w*Math.sin(A),p.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),m.push(C+x,1-b),v.push(c++)}h.push(v)}for(let g=0;g<n;g++)for(let v=0;v<e;v++){const b=h[g][v+1],S=h[g][v],T=h[g+1][v],w=h[g+1][v+1];(g!==0||a>0)&&d.push(b,S,w),(g!==n-1||l<Math.PI)&&d.push(S,T,w)}this.setIndex(d),this.setAttribute("position",new ve(p,3)),this.setAttribute("normal",new ve(_,3)),this.setAttribute("uv",new ve(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pn(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class ei extends He{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);const l=[],c=[],h=[],u=[],f=new P,d=new P,p=new P;for(let _=0;_<=n;_++){const m=a+_/n*o;for(let g=0;g<=s;g++){const v=g/s*r;d.x=(t+e*Math.cos(m))*Math.cos(v),d.y=(t+e*Math.cos(m))*Math.sin(v),d.z=e*Math.sin(m),c.push(d.x,d.y,d.z),f.x=t*Math.cos(v),f.y=t*Math.sin(v),p.subVectors(d,f).normalize(),h.push(p.x,p.y,p.z),u.push(g/s),u.push(_/n)}}for(let _=1;_<=n;_++)for(let m=1;m<=s;m++){const g=(s+1)*_+m-1,v=(s+1)*(_-1)+m-1,b=(s+1)*(_-1)+m,S=(s+1)*_+m;l.push(g,v,S),l.push(v,b,S)}this.setIndex(l),this.setAttribute("position",new ve(c,3)),this.setAttribute("normal",new ve(h,3)),this.setAttribute("uv",new ve(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ei(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}}function us(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];if(hc(s))s.isRenderTargetTexture?(Xt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(hc(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function an(i){const t={};for(let e=0;e<i.length;e++){const n=us(i[e]);for(const s in n)t[s]=n[s]}return t}function hc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function yd(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Fh(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ce.workingColorSpace}const Ed={clone:us,merge:an};var bd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,wd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ni extends Ni{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=bd,this.fragmentShader=wd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=us(t.uniforms),this.uniformsGroups=yd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const n in t.uniforms){const s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Jt().setHex(s.value);break;case"v2":this.uniforms[n].value=new at().fromArray(s.value);break;case"v3":this.uniforms[n].value=new P().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Pe().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Yt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new _e().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class Td extends ni{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Nt extends Ni{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Jt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Jt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ao,this.normalScale=new at(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class il extends Nt{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new at(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ne(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new Jt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Jt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Jt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(t){this._diffuseRoughness>0!=t>0&&this.version++,this._diffuseRoughness=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}get iridescenceThicknessRange(){return ns('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(t){ns('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),this.iridescenceThicknessMinimum=t[0],this.iridescenceThicknessMaximum=t[1]}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.diffuseRoughness=t.diffuseRoughness,this.diffuseRoughnessMap=t.diffuseRoughnessMap,this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum,this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class Ad extends Ni{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Vu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Rd extends Ni{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class qs extends Ne{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Jt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class Cd extends qs{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ne.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Jt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const Ua=new _e,uc=new P,fc=new P;class sl{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new at(512,512),this.mapType=xn,this.map=null,this.mapPass=null,this.matrix=new _e,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new zs,this._frameExtents=new at(1,1),this._viewportCount=1,this._viewports=[new Pe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera;uc.setFromMatrixPosition(t.matrixWorld),e.position.copy(uc),fc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(fc),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){Ua.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Ua,t.coordinateSystem,t.reversedDepth);const r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===Bs||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(Ua)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const br=new P,wr=new Ii,In=new P;class Bh extends Ne{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new _e,this.projectionMatrix=new _e,this.projectionMatrixInverse=new _e,this.coordinateSystem=Cn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(br,wr,In),In.x===1&&In.y===1&&In.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(br,wr,In.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(br,wr,In),In.x===1&&In.y===1&&In.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(br,wr,In.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ui=new P,dc=new at,pc=new at;class gn extends Bh{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=os*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ps*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return os*2*Math.atan(Math.tan(Ps*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ui.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ui.x,ui.y).multiplyScalar(-t/ui.z),ui.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ui.x,ui.y).multiplyScalar(-t/ui.z)}getViewSize(t,e){return this.getViewBounds(t,dc,pc),e.subVectors(pc,dc)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ps*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class Pd extends sl{constructor(){super(new gn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){const e=this.camera,n=os*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;(n!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this.aspect=t.aspect,this}toJSON(){const t=super.toJSON();return t.focus=this.focus,t.aspect=this.aspect,t}}class Ld extends qs{constructor(t,e,n=0,s=Math.PI/3,r=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ne.DEFAULT_UP),this.updateMatrix(),this.target=new Ne,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Pd}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.map=t.map,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.angle=this.angle,e.object.decay=this.decay,e.object.penumbra=this.penumbra,e.object.target=this.target.uuid,this.map&&this.map.isTexture&&(e.object.map=this.map.toJSON(t).uuid),e.object.shadow=this.shadow.toJSON(),e}}class Id extends sl{constructor(){super(new gn(90,1,.5,500)),this.isPointLightShadow=!0}}class Ns extends qs{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Id}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}}class zh extends Bh{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Dd extends sl{constructor(){super(new zh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class mc extends qs{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ne.DEFAULT_UP),this.updateMatrix(),this.target=new Ne,this.shadow=new Dd}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}class Nd extends qs{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const Ji=-90,Ki=1;class Io extends Ne{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new gn(Ji,Ki,t,e);s.layers=this.layers,this.add(s);const r=new gn(Ji,Ki,t,e);r.layers=this.layers,this.add(r);const a=new gn(Ji,Ki,t,e);a.layers=this.layers,this.add(a);const o=new gn(Ji,Ki,t,e);o.layers=this.layers,this.add(o);const l=new gn(Ji,Ki,t,e);l.layers=this.layers,this.add(l);const c=new gn(Ji,Ki,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===Cn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Bs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.mipmapsAutoUpdate=_,t.setRenderTarget(n,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class Ud extends gn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}}function gc(i,t,e,n){const s=Od(n);switch(e){case lh:return i*t;case Vo:return i*t/s.components*s.byteLength;case Wo:return i*t/s.components*s.byteLength;case Ri:return i*t*2/s.components*s.byteLength;case Xo:return i*t*2/s.components*s.byteLength;case ch:return i*t*3/s.components*s.byteLength;case Un:return i*t*4/s.components*s.byteLength;case qo:return i*t*4/s.components*s.byteLength;case Dr:case Nr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ur:case Or:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ka:case ja:return Math.max(i,16)*Math.max(t,8)/4;case Ja:case Qa:return Math.max(i,8)*Math.max(t,8)/2;case to:case eo:case io:case so:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case no:case Br:case ro:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ao:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case oo:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case lo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case co:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case ho:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case uo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case fo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case po:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case mo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case go:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case xo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case _o:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case vo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Mo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case So:case yo:case Eo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case bo:case wo:return Math.ceil(i/4)*Math.ceil(t/4)*8;case zr:case To:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Od(i){switch(i){case xn:case sh:return{byteLength:1,components:1};case Fs:case rh:case kn:return{byteLength:2,components:1};case ko:case Ho:return{byteLength:2,components:4};case Gn:case Go:case Rn:return{byteLength:4,components:1};case ah:case oh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Bo}}));typeof window<"u"&&(window.__THREE__?Xt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Bo);function Gh(){let i=null,t=!1,e=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Fd(i){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,u=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,h),o.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,h);else{u.sort((d,p)=>d.start-p.start);let f=0;for(let d=1;d<u.length;d++){const p=u[f],_=u[d];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++f,u[f]=_)}u.length=f+1;for(let d=0,p=u.length;d<p;d++){const _=u[d];i.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Bd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,zd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Gd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,kd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Vd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Wd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Xd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,qd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Yd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Zd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,$d=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Jd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Kd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Qd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,jd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,tp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ep=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,np=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ip=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,sp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,rp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,ap=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,op=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,lp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,cp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,hp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,up=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,fp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,dp="gl_FragColor = linearToOutputTexel( gl_FragColor );",pp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,mp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,gp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,xp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,_p=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,vp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Mp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Sp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,yp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ep=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,bp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,wp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Tp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ap=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Rp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Cp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Pp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Lp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ip=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Dp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Np=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Up=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Op=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Fp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Bp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,zp=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Gp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,kp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Vp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Wp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Xp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,qp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Yp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$p=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Jp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Kp=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Qp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,tm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,em=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,nm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,im=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,am=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,om=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,lm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,hm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,um=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,fm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,dm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,pm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,mm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,gm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,xm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,_m=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,vm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Mm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Sm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ym=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Em=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,bm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,wm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Tm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Am=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Rm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Cm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Pm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Lm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Im=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Dm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Nm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Um=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Om=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Fm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Bm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gm=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,km=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Wm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Xm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,qm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Ym=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Zm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$m=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Jm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Km=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Qm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,t0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,e0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,n0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,i0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,s0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,r0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,a0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,o0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,l0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,c0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,h0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,u0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,f0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,d0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,p0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,m0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,g0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,te={alphahash_fragment:Bd,alphahash_pars_fragment:zd,alphamap_fragment:Gd,alphamap_pars_fragment:kd,alphatest_fragment:Hd,alphatest_pars_fragment:Vd,aomap_fragment:Wd,aomap_pars_fragment:Xd,batching_pars_vertex:qd,batching_vertex:Yd,begin_vertex:Zd,beginnormal_vertex:$d,bsdfs:Jd,iridescence_fragment:Kd,bumpmap_pars_fragment:Qd,clipping_planes_fragment:jd,clipping_planes_pars_fragment:tp,clipping_planes_pars_vertex:ep,clipping_planes_vertex:np,color_fragment:ip,color_pars_fragment:sp,color_pars_vertex:rp,color_vertex:ap,common:op,defaultnormal_vertex:lp,displacementmap_pars_vertex:cp,displacementmap_vertex:hp,emissivemap_fragment:up,emissivemap_pars_fragment:fp,colorspace_fragment:dp,colorspace_pars_fragment:pp,envmap_fragment:mp,envmap_common_pars_fragment:gp,envmap_pars_fragment:xp,envmap_pars_vertex:_p,envmap_physical_pars_fragment:Cp,envmap_vertex:vp,fog_vertex:Mp,fog_pars_vertex:Sp,fog_fragment:yp,fog_pars_fragment:Ep,gradientmap_pars_fragment:bp,lightmap_pars_fragment:wp,lights_lambert_fragment:Tp,lights_lambert_pars_fragment:Ap,lights_pars_begin:Rp,lights_toon_fragment:Pp,lights_toon_pars_fragment:Lp,lights_phong_fragment:Ip,lights_phong_pars_fragment:Dp,lights_physical_fragment:Np,lights_physical_pars_fragment:Up,lights_fragment_begin:Op,lights_fragment_maps:Fp,lights_fragment_end:Bp,lightprobes_pars_fragment:zp,logdepthbuf_fragment:Gp,logdepthbuf_pars_fragment:kp,logdepthbuf_pars_vertex:Hp,logdepthbuf_vertex:Vp,map_fragment:Wp,map_pars_fragment:Xp,map_particle_fragment:qp,map_particle_pars_fragment:Yp,metalnessmap_fragment:Zp,metalnessmap_pars_fragment:$p,morphinstance_vertex:Jp,morphcolor_vertex:Kp,morphnormal_vertex:Qp,morphtarget_pars_vertex:jp,morphtarget_vertex:tm,normal_fragment_begin:em,normal_fragment_maps:nm,normal_pars_fragment:im,normal_pars_vertex:sm,normal_vertex:rm,normalmap_pars_fragment:am,clearcoat_normal_fragment_begin:om,clearcoat_normal_fragment_maps:lm,clearcoat_pars_fragment:cm,iridescence_pars_fragment:hm,opaque_fragment:um,packing:fm,premultiplied_alpha_fragment:dm,project_vertex:pm,dithering_fragment:mm,dithering_pars_fragment:gm,roughnessmap_fragment:xm,roughnessmap_pars_fragment:_m,shadowmap_pars_fragment:vm,shadowmap_pars_vertex:Mm,shadowmap_vertex:Sm,shadowmask_pars_fragment:ym,skinbase_vertex:Em,skinning_pars_vertex:bm,skinning_vertex:wm,skinnormal_vertex:Tm,specularmap_fragment:Am,specularmap_pars_fragment:Rm,tonemapping_fragment:Cm,tonemapping_pars_fragment:Pm,transmission_fragment:Lm,transmission_pars_fragment:Im,uv_pars_fragment:Dm,uv_pars_vertex:Nm,uv_vertex:Um,worldpos_vertex:Om,background_vert:Fm,background_frag:Bm,backgroundCube_vert:zm,backgroundCube_frag:Gm,cube_vert:km,cube_frag:Hm,depth_vert:Vm,depth_frag:Wm,distance_vert:Xm,distance_frag:qm,equirect_vert:Ym,equirect_frag:Zm,linedashed_vert:$m,linedashed_frag:Jm,meshbasic_vert:Km,meshbasic_frag:Qm,meshlambert_vert:jm,meshlambert_frag:t0,meshmatcap_vert:e0,meshmatcap_frag:n0,meshnormal_vert:i0,meshnormal_frag:s0,meshphong_vert:r0,meshphong_frag:a0,meshphysical_vert:o0,meshphysical_frag:l0,meshtoon_vert:c0,meshtoon_frag:h0,points_vert:u0,points_frag:f0,shadow_vert:d0,shadow_frag:p0,sprite_vert:m0,sprite_frag:g0},yt={common:{diffuse:{value:new Jt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Yt}},envmap:{envMap:{value:null},envMapRotation:{value:new Yt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Yt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Yt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Yt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Yt},normalScale:{value:new at(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Yt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Yt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Yt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Yt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Jt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Jt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0},uvTransform:{value:new Yt}},sprite:{diffuse:{value:new Jt(16777215)},opacity:{value:1},center:{value:new at(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}}},Nn={basic:{uniforms:an([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.fog]),vertexShader:te.meshbasic_vert,fragmentShader:te.meshbasic_frag},lambert:{uniforms:an([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new Jt(0)},envMapIntensity:{value:1}}]),vertexShader:te.meshlambert_vert,fragmentShader:te.meshlambert_frag},phong:{uniforms:an([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new Jt(0)},specular:{value:new Jt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:te.meshphong_vert,fragmentShader:te.meshphong_frag},standard:{uniforms:an([yt.common,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.roughnessmap,yt.metalnessmap,yt.fog,yt.lights,{emissive:{value:new Jt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag},toon:{uniforms:an([yt.common,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.gradientmap,yt.fog,yt.lights,{emissive:{value:new Jt(0)}}]),vertexShader:te.meshtoon_vert,fragmentShader:te.meshtoon_frag},matcap:{uniforms:an([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,{matcap:{value:null}}]),vertexShader:te.meshmatcap_vert,fragmentShader:te.meshmatcap_frag},points:{uniforms:an([yt.points,yt.fog]),vertexShader:te.points_vert,fragmentShader:te.points_frag},dashed:{uniforms:an([yt.common,yt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:te.linedashed_vert,fragmentShader:te.linedashed_frag},depth:{uniforms:an([yt.common,yt.displacementmap]),vertexShader:te.depth_vert,fragmentShader:te.depth_frag},normal:{uniforms:an([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,{opacity:{value:1}}]),vertexShader:te.meshnormal_vert,fragmentShader:te.meshnormal_frag},sprite:{uniforms:an([yt.sprite,yt.fog]),vertexShader:te.sprite_vert,fragmentShader:te.sprite_frag},background:{uniforms:{uvTransform:{value:new Yt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:te.background_vert,fragmentShader:te.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Yt}},vertexShader:te.backgroundCube_vert,fragmentShader:te.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:te.cube_vert,fragmentShader:te.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:te.equirect_vert,fragmentShader:te.equirect_frag},distance:{uniforms:an([yt.common,yt.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:te.distance_vert,fragmentShader:te.distance_frag},shadow:{uniforms:an([yt.lights,yt.fog,{color:{value:new Jt(0)},opacity:{value:1}}]),vertexShader:te.shadow_vert,fragmentShader:te.shadow_frag}};Nn.physical={uniforms:an([Nn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Yt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Yt},clearcoatNormalScale:{value:new at(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Yt},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Yt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Yt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Yt},sheen:{value:0},sheenColor:{value:new Jt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Yt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Yt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Yt},transmissionSamplerSize:{value:new at},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Yt},attenuationDistance:{value:0},attenuationColor:{value:new Jt(0)},specularColor:{value:new Jt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Yt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Yt},anisotropyVector:{value:new at},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Yt}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag};const Tr={r:0,b:0,g:0},x0=new _e,kh=new Yt;kh.set(-1,0,0,0,1,0,0,0,1);function _0(i,t,e,n,s,r){const a=new Jt(0);let o=s===!0?0:1,l,c,h=null,u=0,f=null;function d(v){let b=v.isScene===!0?v.background:null;if(b&&b.isTexture){const S=v.backgroundBlurriness>0;b=t.get(b,S)}return b}function p(v){let b=!1;const S=d(v);S===null?m(a,o):S&&S.isColor&&(m(S,1),b=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?e.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||b)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(v,b){const S=d(b);S&&S.isCubeTexture?(c===void 0&&(c=new K(new Ut(1,1,1),new ni({name:"BackgroundCubeMaterial",uniforms:us(Nn.backgroundCube.uniforms),vertexShader:Nn.backgroundCube.vertexShader,fragmentShader:Nn.backgroundCube.fragmentShader,side:cn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,w,x){this.matrixWorld.copyPosition(x.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(x0.makeRotationFromEuler(b.backgroundRotation)).transpose(),S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(kh),c.material.toneMapped=ce.getTransfer(S.colorSpace)!==Se,(h!==S||u!==S.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,h=S,u=S.version,f=i.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new K(new Ze(2,2),new ni({name:"BackgroundMaterial",uniforms:us(Nn.background.uniforms),vertexShader:Nn.background.vertexShader,fragmentShader:Nn.background.fragmentShader,side:Ai,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=ce.getTransfer(S.colorSpace)!==Se,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(h!==S||u!==S.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=S,u=S.version,f=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function m(v,b){v.getRGB(Tr,Fh(i)),e.buffers.color.setClear(Tr.r,Tr.g,Tr.b,b,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,b=1){a.set(v),o=b,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,m(a,o)},render:p,addToRenderList:_,dispose:g}}function v0(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,a=!1;function o(I,N,F,L,z){let X=!1;const G=u(I,L,F,N);r!==G&&(r=G,c(r.object)),X=d(I,L,F,z),X&&p(I,L,F,z),z!==null&&t.update(z,i.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,S(I,N,F,L),z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function l(){return i.createVertexArray()}function c(I){return i.bindVertexArray(I)}function h(I){return i.deleteVertexArray(I)}function u(I,N,F,L){const z=L.wireframe===!0;let X=n[N.id];X===void 0&&(X={},n[N.id]=X);const G=I.isInstancedMesh===!0?I.id:0;let it=X[G];it===void 0&&(it={},X[G]=it);let q=it[F.id];q===void 0&&(q={},it[F.id]=q);let tt=q[z];return tt===void 0&&(tt=f(l()),q[z]=tt),tt}function f(I){const N=[],F=[],L=[];for(let z=0;z<e;z++)N[z]=0,F[z]=0,L[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:F,attributeDivisors:L,object:I,attributes:{},index:null}}function d(I,N,F,L){const z=r.attributes,X=N.attributes;let G=0;const it=F.getAttributes();for(const q in it)if(it[q].location>=0){const nt=z[q];let Tt=X[q];if(Tt===void 0&&(q==="instanceMatrix"&&I.instanceMatrix&&(Tt=I.instanceMatrix),q==="instanceColor"&&I.instanceColor&&(Tt=I.instanceColor)),nt===void 0||nt.attribute!==Tt||Tt&&nt.data!==Tt.data)return!0;G++}return r.attributesNum!==G||r.index!==L}function p(I,N,F,L){const z={},X=N.attributes;let G=0;const it=F.getAttributes();for(const q in it)if(it[q].location>=0){let nt=X[q];nt===void 0&&(q==="instanceMatrix"&&I.instanceMatrix&&(nt=I.instanceMatrix),q==="instanceColor"&&I.instanceColor&&(nt=I.instanceColor));const Tt={};Tt.attribute=nt,nt&&nt.data&&(Tt.data=nt.data),z[q]=Tt,G++}r.attributes=z,r.attributesNum=G,r.index=L}function _(){const I=r.newAttributes;for(let N=0,F=I.length;N<F;N++)I[N]=0}function m(I){g(I,0)}function g(I,N){const F=r.newAttributes,L=r.enabledAttributes,z=r.attributeDivisors;F[I]=1,L[I]===0&&(i.enableVertexAttribArray(I),L[I]=1),z[I]!==N&&(i.vertexAttribDivisor(I,N),z[I]=N)}function v(){const I=r.newAttributes,N=r.enabledAttributes;for(let F=0,L=N.length;F<L;F++)N[F]!==I[F]&&(i.disableVertexAttribArray(F),N[F]=0)}function b(I,N,F,L,z,X,G){G===!0?i.vertexAttribIPointer(I,N,F,z,X):i.vertexAttribPointer(I,N,F,L,z,X)}function S(I,N,F,L){_();const z=L.attributes,X=F.getAttributes(),G=N.defaultAttributeValues;for(const it in X){const q=X[it];if(q.location>=0){let tt=z[it];if(tt===void 0&&(it==="instanceMatrix"&&I.instanceMatrix&&(tt=I.instanceMatrix),it==="instanceColor"&&I.instanceColor&&(tt=I.instanceColor)),tt!==void 0){const nt=tt.normalized,Tt=tt.itemSize,Gt=t.get(tt);if(Gt===void 0)continue;const Z=Gt.buffer,vt=Gt.type,At=Gt.bytesPerElement,Ft=vt===i.INT||vt===i.UNSIGNED_INT||tt.gpuType===Go;if(tt.isInterleavedBufferAttribute){const Mt=tt.data,Bt=Mt.isInterleavedBuffer===!0?Mt.stride:Mt.itemSize,Te=tt.offset;if(Mt.isInstancedInterleavedBuffer||Mt.isInstancedBufferAttribute){for(let Ht=0;Ht<q.locationSize;Ht++)g(q.location+Ht,Mt.meshPerAttribute);I.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=Mt.meshPerAttribute*Mt.count)}else for(let Ht=0;Ht<q.locationSize;Ht++)m(q.location+Ht);i.bindBuffer(i.ARRAY_BUFFER,Z);for(let Ht=0;Ht<q.locationSize;Ht++)b(q.location+Ht,Tt/q.locationSize,vt,nt,Bt*At,(Te+Tt/q.locationSize*Ht)*At,Ft)}else{if(tt.isInstancedBufferAttribute){for(let Mt=0;Mt<q.locationSize;Mt++)g(q.location+Mt,tt.meshPerAttribute);I.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let Mt=0;Mt<q.locationSize;Mt++)m(q.location+Mt);i.bindBuffer(i.ARRAY_BUFFER,Z);for(let Mt=0;Mt<q.locationSize;Mt++)b(q.location+Mt,Tt/q.locationSize,vt,nt,Tt*At,Tt/q.locationSize*Mt*At,Ft)}}else if(G!==void 0){const nt=G[it];if(nt!==void 0)switch(nt.length){case 2:i.vertexAttrib2fv(q.location,nt);break;case 3:i.vertexAttrib3fv(q.location,nt);break;case 4:i.vertexAttrib4fv(q.location,nt);break;default:i.vertexAttrib1fv(q.location,nt)}}}}v()}function T(){C();for(const I in n){const N=n[I];for(const F in N){const L=N[F];for(const z in L){const X=L[z];for(const G in X)h(X[G].object),delete X[G];delete L[z]}}delete n[I]}}function w(I){if(n[I.id]===void 0)return;const N=n[I.id];for(const F in N){const L=N[F];for(const z in L){const X=L[z];for(const G in X)h(X[G].object),delete X[G];delete L[z]}}delete n[I.id]}function x(I){for(const N in n){const F=n[N];for(const L in F){const z=F[L];if(z[I.id]===void 0)continue;const X=z[I.id];for(const G in X)h(X[G].object),delete X[G];delete z[I.id]}}}function M(I){for(const N in n){const F=n[N],L=I.isInstancedMesh===!0?I.id:0,z=F[L];if(z!==void 0){for(const X in z){const G=z[X];for(const it in G)h(G[it].object),delete G[it];delete z[X]}delete F[L],Object.keys(F).length===0&&delete n[N]}}}function C(){A(),a=!0,r!==s&&(r=s,c(r.object))}function A(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:C,resetDefaultState:A,dispose:T,releaseStatesOfGeometry:w,releaseStatesOfObject:M,releaseStatesOfProgram:x,initAttributes:_,enableAttribute:m,disableUnusedAttributes:v}}function M0(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let f=0;for(let d=0;d<h;d++)f+=c[d];e.update(f,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function S0(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const x=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(x){return!(x!==Un&&n.convert(x)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(x){const M=x===kn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(x!==xn&&x!==Rn&&!M&&n.convert(x)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(x){if(x==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";x="mediump"}return x==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(Xt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=e.logarithmicDepthBuffer===!0&&u===!1;e.reversedDepthBuffer===!0&&u===!1&&Xt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&u===!0&&Xt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:v,maxVaryings:b,maxFragmentUniforms:S,maxSamples:T,samples:w}}function y0(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new fi,o=new Yt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const p=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,g=i.get(u);if(!s||p===null||p.length===0||r&&!m)r?h(null):c();else{const v=r?0:n,b=v*4;let S=g.clippingState||null;l.value=S,S=h(p,f,b,d);for(let T=0;T!==b;++T)S[T]=e[T];g.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,p){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,p!==!0||m===null){const g=d+_*4,v=f.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<g)&&(m=new Float32Array(g));for(let b=0,S=d;b!==_;++b,S+=4)a.copy(u[b]).applyMatrix4(v,o),a.normal.toArray(m,S),m[S+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}class rl extends Fn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new wh(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ut(5,5,5),r=new ni({name:"CubemapFromEquirect",uniforms:us(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:cn,blending:ts});r.uniforms.tEquirect.value=e;const a=new K(s,r),o=e.minFilter;return e.minFilter===pi&&(e.minFilter=un),new Io(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}const xc=256,E0=3,b0=20,Hh=256,Vh=16,w0=3,T0=new P,A0=new Jt;class Ws{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Io(1,10,null),this._boxMesh=new K(new Ut(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){const{size:a=256,position:o=T0}=r,l=this._renderer;this._setSize(a);const c=this._allocateTarget(),h=this._getSourceTarget(!0);e>0&&(h.texture.mipmapsAutoUpdate=!1);const u=l.autoClear,f=l.autoClearColor,d=l.autoClearDepth,p=l.autoClearStencil,_=t.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,_===null&&(t.background=l.getClearColor(A0));const m=new Io(n,s,h);return m.position.copy(o),m.update(l,t),l.autoClear=u,l.autoClearColor=f,l.autoClearDepth=d,l.autoClearStencil=p,t.background=_,e>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,e)),this._applyPMREM(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Mc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=vc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(xc,mh(t))}_fromTexture(t,e){t.mapping===ss||t.mapping===Os?this._setSize(t.image.length===0?xc:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);const n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){const t=this._cubeSize,e=_c(t,!1,!1),n=Math.log2(t)-E0;for(let s=0;s<=n;s++)e.texture.mipmaps.push({width:t>>s,height:t>>s});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){const e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=_c(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){const s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=t,r.activeMipmapLevel=e;const a=t.width>>e;t.viewport.set(0,0,a,a),r.update(this._renderer,s),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===ss||t.mapping===Os?(this._cubemapMaterial===null&&(this._cubemapMaterial=Mc()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=vc()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=R0(),this._integrationMaterial=C0());const e=this._cubeSize,n=t.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;const r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/Vh);for(let a=0;a<=n;a++){const o=Ws.lodToRoughness(a,n);if(a>n-w0)r.roughness.value=o,this._renderCube(t,a,this._integrationMaterial);else{const l=o>0?Math.log2(e)+.5*Math.log2(6/(Hh*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=l,this._renderCube(t,a,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=P0());const n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(t,0,n),s.envMap.value=t.texture,this._renderCube(r,0,n)}}function _c(i,t,e){return new rl(i,{minFilter:pi,generateMipmaps:t,type:kn,colorSpace:Gr,depthBuffer:e})}function Ys(i,t,e){return new ni({name:i,uniforms:t,vertexShader:te.cube_vert,fragmentShader:e,side:cn,blending:ts,depthTest:!1,depthWrite:!1})}function R0(){return Ys("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Hh}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function C0(){return Ys("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Vh}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function P0(){return Ys("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${b0}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function vc(){return Ys("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Mc(){return Ys("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function L0(i){let t=new WeakMap,e=new WeakMap,n=null;function s(f,d=!1){return f==null?null:d?a(f):r(f)}function r(f){if(f&&f.isTexture){const d=f.mapping;if(d===Ir||d===la)if(t.has(f)){const p=t.get(f).texture;return o(p,f.mapping)}else{const p=f.image;if(p&&p.height>0){const _=new rl(p.height);return _.fromEquirectangularTexture(i,f),t.set(f,_),f.addEventListener("dispose",c),o(_.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture&&f.isPMREMTexture!==!0){const d=f.mapping,p=d===Ir||d===la,_=d===ss||d===Os;if(p||_){let m=e.get(f);const g=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==g)return n===null&&(n=new Ws(i)),m=p?n.fromEquirectangular(f,m):n.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,e.set(f,m),m.texture;if(m!==void 0)return m.texture;{const v=f.image;return p&&v&&v.height>0||_&&v&&l(v)?(n===null&&(n=new Ws(i)),m=p?n.fromEquirectangular(f):n.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,e.set(f,m),f.addEventListener("dispose",h),m.texture):null}}}return f}function o(f,d){return d===Ir?f.mapping=ss:d===la&&(f.mapping=Os),f}function l(f){let d=0;const p=6;for(let _=0;_<p;_++)f[_]!==void 0&&d++;return d===p}function c(f){const d=f.target;d.removeEventListener("dispose",c);const p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function h(f){const d=f.target;d.removeEventListener("dispose",h);const p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function u(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function I0(i){const t={};function e(n){if(t[n]!==void 0)return t[n];const s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&ns("WebGLRenderer: "+n+" extension not supported."),s}}}function D0(i,t,e,n){const s={},r=new WeakMap,a=new FinalizationRegistry(p=>delete s[p]);function o(p){l(p.target)}function l(p){p.index!==null&&t.remove(p.index);for(const m in p.attributes)t.remove(p.attributes[m]);p.removeEventListener("dispose",o),delete s[p.id],a.unregister(p);const _=r.get(p);_&&(t.remove(_),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function c(p,_){return s[_.id]!==void 0||(_.addEventListener("dispose",o),s[_.id]=new WeakRef(_),a.register(_,_.id,_),e.memory.geometries++),_}function h(p){const _=p.attributes;for(const m in _)t.update(_[m],i.ARRAY_BUFFER)}function u(p){const _=p.index,m=p.attributes.position;let g=0;if(m===void 0)return;const v=_!==null?_.array.length:m.array.length/3-1,b=m.count>=65535?Mh:vh,S=new b(Math.ceil(v/3)*6,1),T=S.array;if(_!==null){const x=_.array;g=_.version;for(let M=0,C=0;M<v;M+=3){const A=x[M+0],I=x[M+1],N=x[M+2];T[C++]=A,T[C++]=I,T[C++]=I,T[C++]=N,T[C++]=N,T[C++]=A}}else{g=m.version;for(let x=0,M=0;x<v;x+=3){const C=x+0,A=x+1,I=x+2;T[M++]=C,T[M++]=A,T[M++]=A,T[M++]=I,T[M++]=I,T[M++]=C}}S.version=g;const w=r.get(p);w&&t.remove(w),r.set(p,S)}function f(p){const _=r.get(p);if(_){const m=p.index;m!==null&&_.version<m.version&&u(p)}else u(p);return r.get(p)}function d(){for(const p in s){const _=s[p].deref();_!==void 0&&l(_)}}return{get:c,update:h,getWireframeAttribute:f,dispose:d}}function N0(i,t,e){let n;function s(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,f){i.drawElements(n,f,r,u*a),e.update(f,n,1)}function c(u,f,d){d!==0&&(i.drawElementsInstanced(n,f,r,u*a,d),e.update(f,n,d))}function h(u,f,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,d);let _=0;for(let m=0;m<d;m++)_+=f[m];e.update(_,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function U0(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:fe("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function O0(i,t,e){const n=new WeakMap,s=new Pe;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(o);if(f===void 0||f.count!==u){let A=function(){M.dispose(),n.delete(o),o.removeEventListener("dispose",A)};var d=A;f!==void 0&&f.texture.dispose();const p=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],v=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let S=0;p===!0&&(S=1),_===!0&&(S=2),m===!0&&(S=3);let T=o.attributes.position.count*S,w=1;T>t.maxTextureSize&&(w=Math.ceil(T/t.maxTextureSize),T=t.maxTextureSize);const x=new Float32Array(T*w*4*u),M=new gh(x,T,w,u);M.type=Rn,M.needsUpdate=!0;const C=S*4;for(let I=0;I<u;I++){const N=g[I],F=v[I],L=b[I],z=T*w*4*I;for(let X=0;X<N.count;X++){const G=X*C;p===!0&&(s.fromBufferAttribute(N,X),x[z+G+0]=s.x,x[z+G+1]=s.y,x[z+G+2]=s.z,x[z+G+3]=0),_===!0&&(s.fromBufferAttribute(F,X),x[z+G+4]=s.x,x[z+G+5]=s.y,x[z+G+6]=s.z,x[z+G+7]=0),m===!0&&(s.fromBufferAttribute(L,X),x[z+G+8]=s.x,x[z+G+9]=s.y,x[z+G+10]=s.z,x[z+G+11]=L.itemSize===4?s.w:1)}}f={count:u,texture:M,size:new at(T,w)},n.set(o,f),o.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let p=0;for(let m=0;m<c.length;m++)p+=c[m];const _=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function F0(i,t,e,n,s){let r=new WeakMap;function a(c){const h=s.render.frame,u=c.geometry,f=t.get(c,u);if(r.get(f)!==h&&(t.update(f),r.set(f,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const d=c.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return f}function o(){r=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}const B0={[Kc]:"LINEAR_TONE_MAPPING",[Qc]:"REINHARD_TONE_MAPPING",[jc]:"CINEON_TONE_MAPPING",[zo]:"ACES_FILMIC_TONE_MAPPING",[eh]:"AGX_TONE_MAPPING",[nh]:"NEUTRAL_TONE_MAPPING",[th]:"CUSTOM_TONE_MAPPING"};function z0(i,t,e,n,s,r){const a=new Fn(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null,c=null;const h=new He;h.setAttribute("position",new ve([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new ve([0,2,0,0,2,0],2));const u=new Td({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new K(h,u),d=new zh(-1,1,1,-1,0,1);let p=null,_=null,m=!1,g,v=null,b=[],S=!1;this.setSize=function(T,w){a.setSize(T,w),o!==null&&o.setSize(T,w),l!==null&&l.setSize(T,w);for(let x=0;x<b.length;x++){const M=b[x];M.setSize&&M.setSize(T,w)}},this.setEffects=function(T){b=T,S=b.length>0&&b[0].isRenderPass===!0;const w=a.width,x=a.height;b.length>0&&o===null&&(o=new Fn(w,x,{type:kn,depthBuffer:!1,stencilBuffer:!1}),l=new Fn(w,x,{type:kn,depthBuffer:!1,stencilBuffer:!1}));const M=s===!0&&b.some(C=>C.needsDepthTexture===!0);M!==(a.depthTexture!==null)&&(M===!0&&c===null&&(c=new ls(w,x),r===!0&&(c.format=mi,c.type=as)),a.dispose(),a.depthTexture=M?c:null,a.resolveDepthBuffer=M,a.storeMultisampledDepthBuffer=M);for(let C=0;C<b.length;C++){const A=b[C];A.setSize&&A.setSize(w,x),M&&A.needsDepthTexture===!0&&A.setDepthTexture&&A.setDepthTexture(c)}},this.begin=function(T,w){if(m||T.toneMapping===Kn&&b.length===0)return!1;if(v=w,w!==null){const x=w.width,M=w.height;(a.width!==x||a.height!==M)&&this.setSize(x,M)}return S===!1&&T.setRenderTarget(a),g=T.toneMapping,T.toneMapping=Kn,!0},this.hasRenderPass=function(){return S},this.end=function(T,w){T.toneMapping=g,m=!0;let x=a,M=o;for(let C=0;C<b.length;C++){const A=b[C];A.enabled!==!1&&(A.render(T,M,x,w),A.needsSwap!==!1&&(x=M,M=M===o?l:o))}if(p!==T.outputColorSpace||_!==T.toneMapping){p=T.outputColorSpace,_=T.toneMapping,u.defines={},ce.getTransfer(p)===Se&&(u.defines.SRGB_TRANSFER="");const C=B0[_];C&&(u.defines[C]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=x.texture,T.setRenderTarget(v),T.render(f,d),v=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),h.dispose(),u.dispose()}}const Wh=new en,Xh=new ls(1,1),qh=new Ah(1),Yh=new gh,Zh=new Ef,$h=new wh,Sc=[],yc=[],Ec=new Float32Array(16),bc=new Float32Array(9),wc=new Float32Array(4);function ds(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Sc[s];if(r===void 0&&(r=new Float32Array(s),Sc[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Ge(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function ke(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Qr(i,t){let e=yc[t];e===void 0&&(e=new Int32Array(t),yc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function G0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function k0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;i.uniform2fv(this.addr,t),ke(e,t)}}function H0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ge(e,t))return;i.uniform3fv(this.addr,t),ke(e,t)}}function V0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;i.uniform4fv(this.addr,t),ke(e,t)}}function W0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ge(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),ke(e,t)}else{if(Ge(e,n))return;wc.set(n),i.uniformMatrix2fv(this.addr,!1,wc),ke(e,n)}}function X0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ge(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),ke(e,t)}else{if(Ge(e,n))return;bc.set(n),i.uniformMatrix3fv(this.addr,!1,bc),ke(e,n)}}function q0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ge(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),ke(e,t)}else{if(Ge(e,n))return;Ec.set(n),i.uniformMatrix4fv(this.addr,!1,Ec),ke(e,n)}}function Y0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Z0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;i.uniform2iv(this.addr,t),ke(e,t)}}function $0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ge(e,t))return;i.uniform3iv(this.addr,t),ke(e,t)}}function J0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;i.uniform4iv(this.addr,t),ke(e,t)}}function K0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Q0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;i.uniform2uiv(this.addr,t),ke(e,t)}}function j0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ge(e,t))return;i.uniform3uiv(this.addr,t),ke(e,t)}}function tg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;i.uniform4uiv(this.addr,t),ke(e,t)}}function jr(i){return i.version===0&&(i.compareFunction=fh,i.needsUpdate=!0),i}function eg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=jr(Xh):r=Wh,e.setTexture2D(t||r,s)}function ng(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Zh,s)}function ig(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=jr(qh):r=$h,e.setTextureCube(t||r,s)}function sg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Yh,s)}function rg(i){switch(i){case 5126:return G0;case 35664:return k0;case 35665:return H0;case 35666:return V0;case 35674:return W0;case 35675:return X0;case 35676:return q0;case 5124:case 35670:return Y0;case 35667:case 35671:return Z0;case 35668:case 35672:return $0;case 35669:case 35673:return J0;case 5125:return K0;case 36294:return Q0;case 36295:return j0;case 36296:return tg;case 35678:case 36198:case 36298:case 36306:case 35682:return eg;case 35679:case 36299:case 36307:return ng;case 35680:case 36300:case 36308:case 36293:return ig;case 36289:case 36303:case 36311:case 36292:return sg}}function ag(i,t){i.uniform1fv(this.addr,t)}function og(i,t){const e=ds(t,this.size,2);i.uniform2fv(this.addr,e)}function lg(i,t){const e=ds(t,this.size,3);i.uniform3fv(this.addr,e)}function cg(i,t){const e=ds(t,this.size,4);i.uniform4fv(this.addr,e)}function hg(i,t){const e=ds(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function ug(i,t){const e=ds(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function fg(i,t){const e=ds(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function dg(i,t){i.uniform1iv(this.addr,t)}function pg(i,t){i.uniform2iv(this.addr,t)}function mg(i,t){i.uniform3iv(this.addr,t)}function gg(i,t){i.uniform4iv(this.addr,t)}function xg(i,t){i.uniform1uiv(this.addr,t)}function _g(i,t){i.uniform2uiv(this.addr,t)}function vg(i,t){i.uniform3uiv(this.addr,t)}function Mg(i,t){i.uniform4uiv(this.addr,t)}function Sg(i,t,e){const n=this.cache,s=t.length,r=Qr(e,s);Ge(n,r)||(i.uniform1iv(this.addr,r),ke(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=jr(Xh):a=Wh;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function yg(i,t,e){const n=this.cache,s=t.length,r=Qr(e,s);Ge(n,r)||(i.uniform1iv(this.addr,r),ke(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Zh,r[a])}function Eg(i,t,e){const n=this.cache,s=t.length,r=Qr(e,s);Ge(n,r)||(i.uniform1iv(this.addr,r),ke(n,r));let a;this.type===i.SAMPLER_CUBE_SHADOW?a=jr(qh):a=$h;for(let o=0;o!==s;++o)e.setTextureCube(t[o]||a,r[o])}function bg(i,t,e){const n=this.cache,s=t.length,r=Qr(e,s);Ge(n,r)||(i.uniform1iv(this.addr,r),ke(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Yh,r[a])}function wg(i){switch(i){case 5126:return ag;case 35664:return og;case 35665:return lg;case 35666:return cg;case 35674:return hg;case 35675:return ug;case 35676:return fg;case 5124:case 35670:return dg;case 35667:case 35671:return pg;case 35668:case 35672:return mg;case 35669:case 35673:return gg;case 5125:return xg;case 36294:return _g;case 36295:return vg;case 36296:return Mg;case 35678:case 36198:case 36298:case 36306:case 35682:return Sg;case 35679:case 36299:case 36307:return yg;case 35680:case 36300:case 36308:case 36293:return Eg;case 36289:case 36303:case 36311:case 36292:return bg}}class Tg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=rg(e.type)}}class Ag{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=wg(e.type)}}class Rg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const Oa=/(\w+)(\])?(\[|\.)?/g;function Tc(i,t){i.seq.push(t),i.map[t.id]=t}function Cg(i,t,e){const n=i.name,s=n.length;for(Oa.lastIndex=0;;){const r=Oa.exec(n),a=Oa.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Tc(e,c===void 0?new Tg(o,i,t):new Ag(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new Rg(o),Tc(e,u)),e=u}}}class Fr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);Cg(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function Ac(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Pg=37297;let Lg=0;function Ig(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Rc=new Yt;function Dg(i){ce._getMatrix(Rc,ce.workingColorSpace,i);const t=`mat3( ${Rc.elements.map(e=>e.toFixed(4))} )`;switch(ce.getTransfer(i)){case kr:return[t,"LinearTransferOETF"];case Se:return[t,"sRGBTransferOETF"];default:return Xt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Cc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Ig(i.getShaderSource(t),o)}else return r}function Ng(i,t){const e=Dg(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const Ug={[Kc]:"Linear",[Qc]:"Reinhard",[jc]:"Cineon",[zo]:"ACESFilmic",[eh]:"AgX",[nh]:"Neutral",[th]:"Custom"};function Og(i,t){const e=Ug[t];return e===void 0?(Xt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Ar=new P;function Fg(){ce.getLuminanceCoefficients(Ar);const i=Ar.x.toFixed(4),t=Ar.y.toFixed(4),e=Ar.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Bg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Cs).join(`
`)}function zg(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Gg(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Cs(i){return i!==""}function Pc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function Lc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const kg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Do(i){return i.replace(kg,Hg)}function Hg(i,t){const e=te[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return Do(e)}const Vg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ic(i){return i.replace(Vg,Wg)}function Wg(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Dc(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const Xg={[Lr]:"SHADOWMAP_TYPE_PCF",[As]:"SHADOWMAP_TYPE_VSM"};function qg(i){return Xg[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Yg={[Os]:"ENVMAP_MODE_REFRACTION"};function Zg(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Yg[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const $g={[Jc]:"ENVMAP_BLENDING_MULTIPLY",[Gu]:"ENVMAP_BLENDING_MIX",[ku]:"ENVMAP_BLENDING_ADD"};function Jg(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":$g[i.combine]||"ENVMAP_BLENDING_NONE"}function Kg(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=qg(e),c=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=Zg(e),u=Jg(e),f=Bg(e),d=zg(r),p=s.createProgram();let _,m,g=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(_=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d].filter(Cs).join(`
`),_.length>0&&(_+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d].filter(Cs).join(`
`),m.length>0&&(m+=`
`)):(_=[Dc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Cs).join(`
`),m=[Dc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Kn?"#define TONE_MAPPING":"",e.toneMapping!==Kn?te.tonemapping_pars_fragment:"",e.toneMapping!==Kn?Og("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",te.colorspace_pars_fragment,Ng("linearToOutputTexel",e.outputColorSpace),Fg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Cs).join(`
`)),a=Do(a),a=Pc(a,e),a=Lc(a,e),o=Do(o),o=Pc(o,e),o=Lc(o,e),a=Ic(a),o=Ic(o),e.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,_=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,m=["#define varying in",e.glslVersion===Pl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Pl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const v=g+_+a,b=g+m+o,S=Ac(s,s.VERTEX_SHADER,v),T=Ac(s,s.FRAGMENT_SHADER,b);s.attachShader(p,S),s.attachShader(p,T),e.index0AttributeName!==void 0?s.bindAttribLocation(p,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function w(A){if(i.debug.checkShaderErrors){const I=s.getProgramInfoLog(p)||"",N=s.getShaderInfoLog(S)||"",F=s.getShaderInfoLog(T)||"",L=I.trim(),z=N.trim(),X=F.trim();let G=!0,it=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,p,S,T);else{const q=Cc(s,S,"vertex"),tt=Cc(s,T,"fragment");fe("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+L+`
`+q+`
`+tt)}else L!==""?Xt("WebGLProgram: Program Info Log:",L):(z===""||X==="")&&(it=!1);it&&(A.diagnostics={runnable:G,programLog:L,vertexShader:{log:z,prefix:_},fragmentShader:{log:X,prefix:m}})}s.deleteShader(S),s.deleteShader(T),x=new Fr(s,p),M=Gg(s,p)}let x;this.getUniforms=function(){return x===void 0&&w(this),x};let M;this.getAttributes=function(){return M===void 0&&w(this),M};let C=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=s.getProgramParameter(p,Pg)),C},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Lg++,this.cacheKey=t,this.usedTimes=1,this.program=p,this.vertexShader=S,this.fragmentShader=T,this}let Qg=0;class jg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new tx(t),e.set(t,n)),n}}class tx{constructor(t){this.id=Qg++,this.code=t,this.usedTimes=0}}function ex(i){return i===Ri||i===Br||i===zr}function nx(i,t,e,n,s,r){const a=new xh,o=new jg,l=new Set,c=[],h=new Map,u=n.logarithmicDepthBuffer,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function d(x){return l.add(x),x===0?"uv":`uv${x}`}function p(x,M,C,A,I,N){const F=A.fog,L=I.geometry,z=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?A.environment:null,X=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,G=t.get(x.envMap||z,X),it=f[x.type];let q=n.precision;x.precision!==null&&(q=n.getMaxPrecision(x.precision),q!==x.precision&&Xt("WebGLProgram.getParameters:",x.precision,"not supported, using",q,"instead."));const tt=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,nt=tt!==void 0?tt.length:0;let Tt=0;L.morphAttributes.position!==void 0&&(Tt=1),L.morphAttributes.normal!==void 0&&(Tt=2),L.morphAttributes.color!==void 0&&(Tt=3);let Gt,Z,vt,At;if(it){const St=Nn[it];Gt=St.vertexShader,Z=St.fragmentShader}else{Gt=x.vertexShader,Z=x.fragmentShader;const St=o.getVertexShaderStage(x),Me=o.getFragmentShaderStage(x);o.update(x,St,Me),vt=St.id,At=Me.id}const Ft=i.getRenderTarget(),Mt=i.state.buffers.depth.getReversed(),Bt=I.isInstancedMesh===!0,Te=I.isBatchedMesh===!0,Ht=!!x.map,ee=!!x.matcap,se=!!G,et=se&&G.isPMREMTexture===!0,ut=!!x.aoMap,lt=!!x.lightMap,wt=!!x.bumpMap&&x.wireframe===!1,_t=!!x.normalMap,Kt=!!x.displacementMap,It=!!x.emissiveMap,re=!!x.metalnessMap,ae=!!x.roughnessMap,de=x.anisotropy>0,O=x.clearcoat>0,Ue=x.diffuseRoughness>0,ie=x.dispersion>0,ye=x.retroreflectivity>0,mt=x.iridescence>0,De=x.sheen>0,zt=x.transmission>0,qt=de&&!!x.anisotropyMap,R=O&&!!x.clearcoatMap,y=O&&!!x.clearcoatNormalMap,H=O&&!!x.clearcoatRoughnessMap,st=Ue&&!!x.diffuseRoughnessMap,j=mt&&!!x.iridescenceMap,ct=mt&&!!x.iridescenceThicknessMap,gt=De&&!!x.sheenColorMap,$=De&&!!x.sheenRoughnessMap,J=!!x.specularMap,ft=!!x.specularColorMap,D=!!x.specularIntensityMap,Q=zt&&!!x.transmissionMap,Y=zt&&!!x.thicknessMap,dt=!!x.gradientMap,ot=!!x.alphaMap,ht=x.alphaTest>0,Dt=!!x.alphaHash,jt=!!x.extensions;let rt=Kn;x.toneMapped&&(Ft===null||Ft.isXRRenderTarget===!0)&&(rt=i.toneMapping);const Ot=et?G.isCompressedCubeTexture?G.image[0].mipmaps:G.mipmaps:null,Qt={shaderID:it,shaderType:x.type,shaderName:x.name,vertexShader:Gt,fragmentShader:Z,defines:x.defines,customVertexShaderID:vt,customFragmentShaderID:At,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:q,batching:Te,batchingColor:Te&&I._colorsTexture!==null,instancing:Bt,instancingColor:Bt&&I.instanceColor!==null,instancingMorph:Bt&&I.morphTexture!==null,outputColorSpace:Ft===null?i.outputColorSpace:Ft.isXRRenderTarget===!0?Ft.texture.colorSpace:ce.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Ht,matcap:ee,envMap:se,envMapMode:se&&G.mapping,envMapPMREM:et,envMapMaxLod:et?Ot.length-1:null,envMapSize:et?Ot[0].width:null,aoMap:ut,lightMap:lt,bumpMap:wt,normalMap:_t,displacementMap:Kt,emissiveMap:It,normalMapObjectSpace:_t&&x.normalMapType===Wu,normalMapTangentSpace:_t&&x.normalMapType===Ao,packedNormalMap:_t&&x.normalMapType===Ao&&ex(x.normalMap.format),metalnessMap:re,roughnessMap:ae,anisotropy:de,anisotropyMap:qt,clearcoat:O,clearcoatMap:R,clearcoatNormalMap:y,clearcoatRoughnessMap:H,diffuseRoughness:Ue,diffuseRoughnessMap:st,dispersion:ie,retroreflection:ye,iridescence:mt,iridescenceMap:j,iridescenceThicknessMap:ct,sheen:De,sheenColorMap:gt,sheenRoughnessMap:$,specularMap:J,specularColorMap:ft,specularIntensityMap:D,transmission:zt,transmissionMap:Q,thicknessMap:Y,gradientMap:dt,opaque:x.transparent===!1&&x.blending===es&&x.alphaToCoverage===!1,alphaMap:ot,alphaTest:ht,alphaHash:Dt,combine:x.combine,mapUv:Ht&&d(x.map.channel),aoMapUv:ut&&d(x.aoMap.channel),lightMapUv:lt&&d(x.lightMap.channel),bumpMapUv:wt&&d(x.bumpMap.channel),normalMapUv:_t&&d(x.normalMap.channel),displacementMapUv:Kt&&d(x.displacementMap.channel),emissiveMapUv:It&&d(x.emissiveMap.channel),metalnessMapUv:re&&d(x.metalnessMap.channel),roughnessMapUv:ae&&d(x.roughnessMap.channel),anisotropyMapUv:qt&&d(x.anisotropyMap.channel),clearcoatMapUv:R&&d(x.clearcoatMap.channel),clearcoatNormalMapUv:y&&d(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:H&&d(x.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:st&&d(x.diffuseRoughnessMap.channel),iridescenceMapUv:j&&d(x.iridescenceMap.channel),iridescenceThicknessMapUv:ct&&d(x.iridescenceThicknessMap.channel),sheenColorMapUv:gt&&d(x.sheenColorMap.channel),sheenRoughnessMapUv:$&&d(x.sheenRoughnessMap.channel),specularMapUv:J&&d(x.specularMap.channel),specularColorMapUv:ft&&d(x.specularColorMap.channel),specularIntensityMapUv:D&&d(x.specularIntensityMap.channel),transmissionMapUv:Q&&d(x.transmissionMap.channel),thicknessMapUv:Y&&d(x.thicknessMap.channel),alphaMapUv:ot&&d(x.alphaMap.channel),vertexTangents:!!L.attributes.tangent&&(_t||de),vertexNormals:!!L.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!L.attributes.uv&&(Ht||ot),fog:!!F,useFog:x.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||L.attributes.normal===void 0&&_t===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Mt,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:L.attributes.position!==void 0,morphTargets:L.morphAttributes.position!==void 0,morphNormals:L.morphAttributes.normal!==void 0,morphColors:L.morphAttributes.color!==void 0,morphTargetsCount:nt,morphTextureStride:Tt,numSunLights:M.sun.length,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numSunLightShadows:M.sunShadowMap.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numLightProbeGrids:N.filter(St=>St.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:rt,decodeVideoTexture:Ht&&x.map.isVideoTexture===!0&&ce.getTransfer(x.map.colorSpace)===Se,decodeVideoTextureEmissive:It&&x.emissiveMap.isVideoTexture===!0&&ce.getTransfer(x.emissiveMap.colorSpace)===Se,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===qe,flipSided:x.side===cn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:jt&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(jt&&x.extensions.multiDraw===!0||Te)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Qt.vertexUv1s=l.has(1),Qt.vertexUv2s=l.has(2),Qt.vertexUv3s=l.has(3),l.clear(),Qt}function _(x){const M=[];if(x.shaderID?M.push(x.shaderID):(M.push(x.customVertexShaderID),M.push(x.customFragmentShaderID)),x.defines!==void 0)for(const C in x.defines)M.push(C),M.push(x.defines[C]);return x.isRawShaderMaterial===!1&&(m(M,x),g(M,x),M.push(i.outputColorSpace)),M.push(x.customProgramCacheKey),M.join()}function m(x,M){x.push(M.precision),x.push(M.outputColorSpace),x.push(M.envMapMode),x.push(M.envMapPMREM),x.push(M.envMapMaxLod),x.push(M.envMapSize),x.push(M.mapUv),x.push(M.alphaMapUv),x.push(M.lightMapUv),x.push(M.aoMapUv),x.push(M.bumpMapUv),x.push(M.normalMapUv),x.push(M.displacementMapUv),x.push(M.emissiveMapUv),x.push(M.metalnessMapUv),x.push(M.roughnessMapUv),x.push(M.anisotropyMapUv),x.push(M.clearcoatMapUv),x.push(M.clearcoatNormalMapUv),x.push(M.clearcoatRoughnessMapUv),x.push(M.diffuseRoughnessMapUv),x.push(M.iridescenceMapUv),x.push(M.iridescenceThicknessMapUv),x.push(M.sheenColorMapUv),x.push(M.sheenRoughnessMapUv),x.push(M.specularMapUv),x.push(M.specularColorMapUv),x.push(M.specularIntensityMapUv),x.push(M.transmissionMapUv),x.push(M.thicknessMapUv),x.push(M.combine),x.push(M.fogExp2),x.push(M.sizeAttenuation),x.push(M.morphTargetsCount),x.push(M.numSunLights),x.push(M.numDirLights),x.push(M.numPointLights),x.push(M.numSpotLights),x.push(M.numSpotLightMaps),x.push(M.numHemiLights),x.push(M.numRectAreaLights),x.push(M.numSunLightShadows),x.push(M.numDirLightShadows),x.push(M.numPointLightShadows),x.push(M.numSpotLightShadows),x.push(M.numSpotLightShadowsWithMaps),x.push(M.numLightProbes),x.push(M.numLightProbeGrids),x.push(M.shadowMapType),x.push(M.toneMapping),x.push(M.numClippingPlanes),x.push(M.numClipIntersection),x.push(M.depthPacking)}function g(x,M){a.disableAll(),M.instancing&&a.enable(0),M.instancingColor&&a.enable(1),M.instancingMorph&&a.enable(2),M.matcap&&a.enable(3),M.envMap&&a.enable(4),M.normalMapObjectSpace&&a.enable(5),M.normalMapTangentSpace&&a.enable(6),M.clearcoat&&a.enable(7),M.iridescence&&a.enable(8),M.alphaTest&&a.enable(9),M.vertexColors&&a.enable(10),M.vertexAlphas&&a.enable(11),M.vertexUv1s&&a.enable(12),M.vertexUv2s&&a.enable(13),M.vertexUv3s&&a.enable(14),M.vertexTangents&&a.enable(15),M.anisotropy&&a.enable(16),M.alphaHash&&a.enable(17),M.batching&&a.enable(18),M.dispersion&&a.enable(19),M.retroreflection&&a.enable(24),M.diffuseRoughness&&a.enable(25),M.batchingColor&&a.enable(20),M.gradientMap&&a.enable(21),M.packedNormalMap&&a.enable(22),M.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),M.numLightProbeGrids>0&&a.enable(22),M.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function v(x){const M=f[x.type];let C;if(M){const A=Nn[M];C=Ed.clone(A.uniforms)}else C=x.uniforms;return C}function b(x,M){let C=h.get(M);return C!==void 0?++C.usedTimes:(C=new Kg(i,M,x,s),c.push(C),h.set(M,C)),C}function S(x){if(--x.usedTimes===0){const M=c.indexOf(x);c[M]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function T(x){o.remove(x)}function w(){o.dispose()}return{getParameters:p,getProgramCacheKey:_,getUniforms:v,acquireProgram:b,releaseProgram:S,releaseShaderCache:T,programs:c,dispose:w}}function ix(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function sx(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Nc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Uc(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function o(f,d,p,_,m,g){let v=i[t];return v===void 0?(v={id:f.id,object:f,geometry:d,material:p,materialVariant:a(f),groupOrder:_,renderOrder:f.renderOrder,z:m,group:g},i[t]=v):(v.id=f.id,v.object=f,v.geometry=d,v.material=p,v.materialVariant=a(f),v.groupOrder=_,v.renderOrder=f.renderOrder,v.z=m,v.group=g),t++,v}function l(f,d,p,_,m,g,v){v.reversedDepth===!0&&(m=-m);const b=o(f,d,p,_,m,g);p.transmission>0?n.push(b):p.transparent===!0?s.push(b):e.push(b)}function c(f,d,p,_,m,g){const v=o(f,d,p,_,m,g);p.transmission>0?n.unshift(v):p.transparent===!0?s.unshift(v):e.unshift(v)}function h(f,d){e.length>1&&e.sort(f||sx),n.length>1&&n.sort(d||Nc),s.length>1&&s.sort(d||Nc)}function u(){for(let f=t,d=i.length;f<d;f++){const p=i[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:u,sort:h}}function rx(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new Uc,i.set(n,[a])):s>=r.length?(a=new Uc,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function ax(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new P,color:new Jt};break;case"SpotLight":e={position:new P,direction:new P,color:new Jt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new Jt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new Jt,groundColor:new Jt};break;case"RectAreaLight":e={color:new Jt,position:new P,halfWidth:new P,halfHeight:new P};break}return i[t.id]=e,e}}}function ox(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let lx=0;function cx(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function hx(i){const t=new ax,e=ox(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new P);const s=new P,r=new _e,a=new _e;function o(c){let h=0,u=0,f=0;for(let N=0;N<9;N++)n.probe[N].set(0,0,0);let d=0,p=0,_=0,m=0,g=0,v=0,b=0,S=0,T=0,w=0,x=0,M=0,C=0,A=0;c.sort(cx);for(let N=0,F=c.length;N<F;N++){const L=c[N],z=L.color,X=L.intensity,G=L.distance;let it=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===Ri?it=L.shadow.map.texture:it=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)h+=z.r*X,u+=z.g*X,f+=z.b*X;else if(L.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(L.sh.coefficients[q],X);A++}else if(L.isSunLight){const q=t.get(L);if(q.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const tt=L.shadow,nt=e.get(L);nt.shadowIntensity=tt.intensity,nt.shadowBias=tt.bias,nt.shadowNormalBias=tt.normalBias,nt.shadowRadius=tt.radius,nt.shadowMapSize.copy(tt.mapSize).multiply(tt.getFrameExtents()),n.sunShadow[p]=nt,n.sunShadowMap[p]=it;const Tt=tt.getViewportCount();for(let Gt=0;Gt<Tt;Gt++)n.sunShadowMatrix[_+Gt]=tt.getMatrix(Gt),n.sunShadowCascade[_+Gt]=tt._cascadeData[Gt];_+=Tt,p++}n.sun[d]=q,d++}else if(L.isDirectionalLight){const q=t.get(L);if(q.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const tt=L.shadow,nt=e.get(L);nt.shadowIntensity=tt.intensity,nt.shadowBias=tt.bias,nt.shadowNormalBias=tt.normalBias,nt.shadowRadius=tt.radius,nt.shadowMapSize=tt.mapSize,n.directionalShadow[m]=nt,n.directionalShadowMap[m]=it,n.directionalShadowMatrix[m]=L.shadow.matrix,T++}n.directional[m]=q,m++}else if(L.isSpotLight){const q=t.get(L);q.position.setFromMatrixPosition(L.matrixWorld),q.color.copy(z).multiplyScalar(X),q.distance=G,q.coneCos=Math.cos(L.angle),q.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),q.decay=L.decay,n.spot[v]=q;const tt=L.shadow;if(L.map&&(n.spotLightMap[M]=L.map,M++,tt.updateMatrices(L),L.castShadow&&C++),n.spotLightMatrix[v]=tt.matrix,L.castShadow){const nt=e.get(L);nt.shadowIntensity=tt.intensity,nt.shadowBias=tt.bias,nt.shadowNormalBias=tt.normalBias,nt.shadowRadius=tt.radius,nt.shadowMapSize=tt.mapSize,n.spotShadow[v]=nt,n.spotShadowMap[v]=it,x++}v++}else if(L.isRectAreaLight){const q=t.get(L);q.color.copy(z).multiplyScalar(X),q.halfWidth.set(L.width*.5,0,0),q.halfHeight.set(0,L.height*.5,0),n.rectArea[b]=q,b++}else if(L.isPointLight){const q=t.get(L);if(q.color.copy(L.color).multiplyScalar(L.intensity),q.distance=L.distance,q.decay=L.decay,L.castShadow){const tt=L.shadow,nt=e.get(L);nt.shadowIntensity=tt.intensity,nt.shadowBias=tt.bias,nt.shadowNormalBias=tt.normalBias,nt.shadowRadius=tt.radius,nt.shadowMapSize=tt.mapSize,nt.shadowCameraNear=tt.camera.near,nt.shadowCameraFar=tt.camera.far,n.pointShadow[g]=nt,n.pointShadowMap[g]=it,n.pointShadowMatrix[g]=L.shadow.matrix,w++}n.point[g]=q,g++}else if(L.isHemisphereLight){const q=t.get(L);q.skyColor.copy(L.color).multiplyScalar(X),q.groundColor.copy(L.groundColor).multiplyScalar(X),n.hemi[S]=q,S++}}b>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=yt.LTC_FLOAT_1,n.rectAreaLTC2=yt.LTC_FLOAT_2):(n.rectAreaLTC1=yt.LTC_HALF_1,n.rectAreaLTC2=yt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const I=n.hash;(I.sunLength!==d||I.directionalLength!==m||I.pointLength!==g||I.spotLength!==v||I.rectAreaLength!==b||I.hemiLength!==S||I.numSunShadows!==p||I.numDirectionalShadows!==T||I.numPointShadows!==w||I.numSpotShadows!==x||I.numSpotMaps!==M||I.numLightProbes!==A)&&(n.sun.length=d,n.directional.length=m,n.spot.length=v,n.rectArea.length=b,n.point.length=g,n.hemi.length=S,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.directionalShadowMatrix.length=T,n.pointShadow.length=w,n.pointShadowMap.length=w,n.pointShadowMatrix.length=w,n.spotShadow.length=x,n.spotShadowMap.length=x,n.spotLightMatrix.length=x+M-C,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=A,I.sunLength=d,I.directionalLength=m,I.pointLength=g,I.spotLength=v,I.rectAreaLength=b,I.hemiLength=S,I.numSunShadows=p,I.numDirectionalShadows=T,I.numPointShadows=w,I.numSpotShadows=x,I.numSpotMaps=M,I.numLightProbes=A,n.version=lx++)}function l(c,h){let u=0,f=0,d=0,p=0,_=0,m=0;const g=h.matrixWorldInverse;for(let v=0,b=c.length;v<b;v++){const S=c[v];if(S.isSunLight){const T=n.sun[u];T.direction.setFromMatrixPosition(S.matrixWorld),T.direction.transformDirection(g),u++}else if(S.isDirectionalLight){const T=n.directional[f];T.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(g),f++}else if(S.isSpotLight){const T=n.spot[p];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(g),T.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(g),p++}else if(S.isRectAreaLight){const T=n.rectArea[_];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(g),a.identity(),r.copy(S.matrixWorld),r.premultiply(g),a.extractRotation(r),T.halfWidth.set(S.width*.5,0,0),T.halfHeight.set(0,S.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),_++}else if(S.isPointLight){const T=n.point[d];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(g),d++}else if(S.isHemisphereLight){const T=n.hemi[m];T.direction.setFromMatrixPosition(S.matrixWorld),T.direction.transformDirection(g),m++}}}return{setup:o,setupView:l,state:n}}function Oc(i){const t=new hx(i),e=[],n=[],s=[];function r(u){h.camera=u,e.length=0,n.length=0,s.length=0}function a(u){u.isLightProbeGrid?s.push(u):e.push(u)}function o(u){n.push(u)}function l(){t.setup(e),s.sort((u,f)=>u.priority-f.priority||u.id-f.id)}function c(u){t.setupView(e,u)}const h={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function ux(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Oc(i),t.set(s,[o])):r>=a.length?(o=new Oc(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const fx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,dx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,px=[new P(1,0,0),new P(-1,0,0),new P(0,1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1)],mx=[new P(0,-1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1),new P(0,-1,0),new P(0,-1,0)],Fc=new _e,bs=new P,Fa=new P;function gx(i,t,e){let n=new zs;const s=new at,r=new at,a=new Pe,o=new Ad,l=new Rd,c={},h=e.maxTextureSize,u={[Ai]:cn,[cn]:Ai,[qe]:qe},f=new ni({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new at},radius:{value:4}},vertexShader:fx,fragmentShader:dx}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const p=new He;p.setAttribute("position",new Ln(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new K(p,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Lr;let g=this.type;this.render=function(w,x,M){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;this.type===Su&&(Xt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Lr);const C=i.getRenderTarget(),A=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),N=i.state;N.setBlending(ts),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const F=g!==this.type;F&&x.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(z=>z.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,z=w.length;L<z;L++){const X=w[L],G=X.shadow;if(G===void 0){Xt("WebGLShadowMap:",X,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const it=G.getFrameExtents();s.multiply(it),r.copy(G.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/it.x),s.x=r.x*it.x,G.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/it.y),s.y=r.y*it.y,G.mapSize.y=r.y));const q=i.state.buffers.depth.getReversed();if(G.camera._reversedDepth=q,G.map===null||F===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===As){if(X.isPointLight){Xt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new Fn(s.x,s.y,{format:Ri,type:kn,minFilter:un,magFilter:un,generateMipmaps:!1}),G.map.texture.name=X.name+".shadowMap",G.map.depthTexture=new ls(s.x,s.y,Rn),G.map.depthTexture.name=X.name+".shadowMapDepth",G.map.depthTexture.format=gi,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=$e,G.map.depthTexture.magFilter=$e}else X.isPointLight?(G.map=new rl(s.x),G.map.depthTexture=new Ah(s.x,Gn)):(G.map=new Fn(s.x,s.y),G.map.depthTexture=new ls(s.x,s.y,Gn)),G.map.depthTexture.name=X.name+".shadowMap",G.map.depthTexture.format=gi,this.type===Lr?(G.map.depthTexture.compareFunction=q?uh:hh,G.map.depthTexture.minFilter=un,G.map.depthTexture.magFilter=un):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=$e,G.map.depthTexture.magFilter=$e);G.camera.updateProjectionMatrix()}G.map.isWebGLCubeRenderTarget!==!0&&(G.map.width!==s.x||G.map.height!==s.y)&&G.map.setSize(s.x,s.y);const tt=G.map.isWebGLCubeRenderTarget?6:G.getViewportCount();X.isPointLight!==!0&&G.updateMatrices(X,M);const nt=(G.camera.layers.mask&4294967294)!==0?G.camera.layers:M.layers;for(let Tt=0;Tt<tt;Tt++){const Gt=G.getCamera(Tt);if(X.isPointLight){const Z=G.camera,vt=G.matrix,At=X.distance||Z.far;At!==Z.far&&(Z.far=At,Z.updateProjectionMatrix()),bs.setFromMatrixPosition(X.matrixWorld),Z.position.copy(bs),Fa.copy(Z.position),Fa.add(px[Tt]),Z.up.copy(mx[Tt]),Z.lookAt(Fa),Z.updateMatrixWorld(),vt.makeTranslation(-bs.x,-bs.y,-bs.z),Fc.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),G._frustum.setFromProjectionMatrix(Fc,Z.coordinateSystem,Z.reversedDepth)}if(G.map.isWebGLCubeRenderTarget)i.setRenderTarget(G.map,Tt),i.clear();else{Tt===0&&(i.setRenderTarget(G.map),i.clear());const Z=G.getViewport(Tt);a.set(r.x*Z.x,r.y*Z.y,r.x*Z.z,r.y*Z.w),N.viewport(a)}n=G.getFrustum(Tt),S(x,M,Gt,X,nt,this.type)}G.isPointLightShadow!==!0&&this.type===As&&v(G,M),G.needsUpdate=!1}g=this.type,m.needsUpdate=!1,i.setRenderTarget(C,A,I)};function v(w,x){const M=t.update(_);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null?w.mapPass=new Fn(s.x,s.y,{format:Ri,type:kn}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),f.uniforms.shadow_pass.value=w.map.depthTexture,f.uniforms.resolution.value.set(w.map.width,w.map.height),f.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(x,null,M,f,_,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value.set(w.map.width,w.map.height),d.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(x,null,M,d,_,null)}function b(w,x,M,C){let A=null;const I=M.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(I!==void 0)A=I;else if(A=M.isPointLight===!0?l:o,i.localClippingEnabled&&x.clipShadows===!0&&Array.isArray(x.clippingPlanes)&&x.clippingPlanes.length!==0||x.displacementMap&&x.displacementScale!==0||x.alphaMap&&x.alphaTest>0||x.map&&x.alphaTest>0||x.alphaToCoverage===!0){const N=A.uuid,F=x.uuid;let L=c[N];L===void 0&&(L={},c[N]=L);let z=L[F];z===void 0&&(z=A.clone(),L[F]=z,x.addEventListener("dispose",T)),A=z}if(A.visible=x.visible,A.wireframe=x.wireframe,C===As?A.side=x.shadowSide!==null?x.shadowSide:x.side:A.side=x.shadowSide!==null?x.shadowSide:u[x.side],A.alphaMap=x.alphaMap,A.alphaTest=x.alphaToCoverage===!0?.5:x.alphaTest,A.map=x.map,A.clipShadows=x.clipShadows,A.clippingPlanes=x.clippingPlanes,A.clipIntersection=x.clipIntersection,A.displacementMap=x.displacementMap,A.displacementScale=x.displacementScale,A.displacementBias=x.displacementBias,A.wireframeLinewidth=x.wireframeLinewidth,A.linewidth=x.linewidth,M.isPointLight===!0&&A.isMeshDistanceMaterial===!0){const N=i.properties.get(A);N.light=M}return A}function S(w,x,M,C,A,I){if(w.visible===!1)return;if(w.layers.test(A)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&I===As)&&(!w.frustumCulled||w.intersectsFrustum(n))){w.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,w.matrixWorld);const L=t.update(w),z=w.material;if(Array.isArray(z)){const X=L.groups;for(let G=0,it=X.length;G<it;G++){const q=X[G],tt=z[q.materialIndex];if(tt&&tt.visible){const nt=b(w,tt,C,I);w.onBeforeShadow(i,w,x,M,L,nt,q),i.renderBufferDirect(M,null,L,nt,w,q),w.onAfterShadow(i,w,x,M,L,nt,q)}}}else if(z.visible){const X=b(w,z,C,I);w.onBeforeShadow(i,w,x,M,L,X,null),i.renderBufferDirect(M,null,L,X,w,null),w.onAfterShadow(i,w,x,M,L,X,null)}}const F=w.children;for(let L=0,z=F.length;L<z;L++)S(F[L],x,M,C,A,I)}function T(w){w.target.removeEventListener("dispose",T);for(const M in c){const C=c[M],A=w.target.uuid;A in C&&(C[A].dispose(),delete C[A])}}}function xx(i,t){function e(){let D=!1;const Q=new Pe;let Y=null;const dt=new Pe(0,0,0,0);return{setMask:function(ot){Y!==ot&&!D&&(i.colorMask(ot,ot,ot,ot),Y=ot)},setLocked:function(ot){D=ot},setClear:function(ot,ht,Dt,jt,rt){rt===!0&&(ot*=jt,ht*=jt,Dt*=jt),Q.set(ot,ht,Dt,jt),dt.equals(Q)===!1&&(i.clearColor(ot,ht,Dt,jt),dt.copy(Q))},reset:function(){D=!1,Y=null,dt.set(-1,0,0,0)}}}function n(){let D=!1,Q=!1,Y=null,dt=null,ot=null;return{setReversed:function(ht){if(Q!==ht){const Dt=t.get("EXT_clip_control");ht?Dt.clipControlEXT(Dt.LOWER_LEFT_EXT,Dt.ZERO_TO_ONE_EXT):Dt.clipControlEXT(Dt.LOWER_LEFT_EXT,Dt.NEGATIVE_ONE_TO_ONE_EXT),Q=ht;const jt=ot;ot=null,this.setClear(jt)}},getReversed:function(){return Q},setTest:function(ht){ht?Mt(i.DEPTH_TEST):Bt(i.DEPTH_TEST)},setMask:function(ht){Y!==ht&&!D&&(i.depthMask(ht),Y=ht)},setFunc:function(ht){if(Q&&(ht=tf[ht]),dt!==ht){switch(ht){case Ha:i.depthFunc(i.NEVER);break;case Va:i.depthFunc(i.ALWAYS);break;case Wa:i.depthFunc(i.LESS);break;case Us:i.depthFunc(i.LEQUAL);break;case Xa:i.depthFunc(i.EQUAL);break;case qa:i.depthFunc(i.GEQUAL);break;case Ya:i.depthFunc(i.GREATER);break;case Za:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}dt=ht}},setLocked:function(ht){D=ht},setClear:function(ht){ot!==ht&&(ot=ht,Q&&(ht=1-ht),i.clearDepth(ht))},reset:function(){D=!1,Y=null,dt=null,ot=null,Q=!1}}}function s(){let D=!1,Q=null,Y=null,dt=null,ot=null,ht=null,Dt=null,jt=null,rt=null;return{setTest:function(Ot){D||(Ot?Mt(i.STENCIL_TEST):Bt(i.STENCIL_TEST))},setMask:function(Ot){Q!==Ot&&!D&&(i.stencilMask(Ot),Q=Ot)},setFunc:function(Ot,Qt,St){(Y!==Ot||dt!==Qt||ot!==St)&&(i.stencilFunc(Ot,Qt,St),Y=Ot,dt=Qt,ot=St)},setOp:function(Ot,Qt,St){(ht!==Ot||Dt!==Qt||jt!==St)&&(i.stencilOp(Ot,Qt,St),ht=Ot,Dt=Qt,jt=St)},setLocked:function(Ot){D=Ot},setClear:function(Ot){rt!==Ot&&(i.clearStencil(Ot),rt=Ot)},reset:function(){D=!1,Q=null,Y=null,dt=null,ot=null,ht=null,Dt=null,jt=null,rt=null}}}const r=new e,a=new n,o=new s;let l={};const c=new WeakMap;let h={},u={},f={},d=new WeakMap,p=[],_=null,m=!1,g=null,v=null,b=null,S=null,T=null,w=null,x=null,M=new Jt(0,0,0),C=0,A=!1,I=null,N=null,F=null,L=null,z=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,it=0;const q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(it=parseFloat(/^WebGL (\d)/.exec(q)[1]),G=it>=1):q.indexOf("OpenGL ES")!==-1&&(it=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),G=it>=2);let tt=null,nt={};const Tt=i.getParameter(i.SCISSOR_BOX),Gt=i.getParameter(i.VIEWPORT),Z=new Pe().fromArray(Tt),vt=new Pe().fromArray(Gt);function At(D,Q,Y,dt){const ot=new Uint8Array(4),ht=i.createTexture();i.bindTexture(D,ht),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Dt=0;Dt<Y;Dt++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(Q,0,i.RGBA,1,1,dt,0,i.RGBA,i.UNSIGNED_BYTE,ot):i.texImage2D(Q+Dt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ot);return ht}const Ft={};Ft[i.TEXTURE_2D]=At(i.TEXTURE_2D,i.TEXTURE_2D,1),Ft[i.TEXTURE_CUBE_MAP]=At(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ft[i.TEXTURE_2D_ARRAY]=At(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Ft[i.TEXTURE_3D]=At(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Mt(i.DEPTH_TEST),a.setFunc(Us),wt(!1),_t(Al),Mt(i.CULL_FACE),ut(ts);function Mt(D){h[D]!==!0&&(i.enable(D),h[D]=!0)}function Bt(D){h[D]!==!1&&(i.disable(D),h[D]=!1)}function Te(D,Q){return f[D]!==Q?(i.bindFramebuffer(D,Q),f[D]=Q,D===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=Q),D===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=Q),!0):!1}function Ht(D,Q){let Y=p,dt=!1;if(D){Y=d.get(Q),Y===void 0&&(Y=[],d.set(Q,Y));const ot=D.textures;if(Y.length!==ot.length||Y[0]!==i.COLOR_ATTACHMENT0){for(let ht=0,Dt=ot.length;ht<Dt;ht++)Y[ht]=i.COLOR_ATTACHMENT0+ht;Y.length=ot.length,dt=!0}}else Y[0]!==i.BACK&&(Y[0]=i.BACK,dt=!0);dt&&i.drawBuffers(Y)}function ee(D){return _!==D?(i.useProgram(D),_=D,!0):!1}const se={[Qi]:i.FUNC_ADD,[Eu]:i.FUNC_SUBTRACT,[bu]:i.FUNC_REVERSE_SUBTRACT};se[wu]=i.MIN,se[Tu]=i.MAX;const et={[Au]:i.ZERO,[Ru]:i.ONE,[Cu]:i.SRC_COLOR,[Zc]:i.SRC_ALPHA,[Uu]:i.SRC_ALPHA_SATURATE,[Du]:i.DST_COLOR,[Lu]:i.DST_ALPHA,[Pu]:i.ONE_MINUS_SRC_COLOR,[$c]:i.ONE_MINUS_SRC_ALPHA,[Nu]:i.ONE_MINUS_DST_COLOR,[Iu]:i.ONE_MINUS_DST_ALPHA,[Ou]:i.CONSTANT_COLOR,[Fu]:i.ONE_MINUS_CONSTANT_COLOR,[Bu]:i.CONSTANT_ALPHA,[zu]:i.ONE_MINUS_CONSTANT_ALPHA};function ut(D,Q,Y,dt,ot,ht,Dt,jt,rt,Ot){if(D===ts){m===!0&&(Bt(i.BLEND),m=!1);return}if(m===!1&&(Mt(i.BLEND),m=!0),D!==yu){if(D!==g||Ot!==A){if((v!==Qi||T!==Qi)&&(i.blendEquation(i.FUNC_ADD),v=Qi,T=Qi),Ot)switch(D){case es:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case zn:i.blendFunc(i.ONE,i.ONE);break;case Rl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Cl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:fe("WebGLState: Invalid blending: ",D);break}else switch(D){case es:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case zn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Rl:fe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Cl:fe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:fe("WebGLState: Invalid blending: ",D);break}b=null,S=null,w=null,x=null,M.set(0,0,0),C=0,g=D,A=Ot}return}ot=ot||Q,ht=ht||Y,Dt=Dt||dt,(Q!==v||ot!==T)&&(i.blendEquationSeparate(se[Q],se[ot]),v=Q,T=ot),(Y!==b||dt!==S||ht!==w||Dt!==x)&&(i.blendFuncSeparate(et[Y],et[dt],et[ht],et[Dt]),b=Y,S=dt,w=ht,x=Dt),(jt.equals(M)===!1||rt!==C)&&(i.blendColor(jt.r,jt.g,jt.b,rt),M.copy(jt),C=rt),g=D,A=!1}function lt(D,Q){D.side===qe?Bt(i.CULL_FACE):Mt(i.CULL_FACE);let Y=D.side===cn;Q&&(Y=!Y),wt(Y),D.blending===es&&D.transparent===!1?ut(ts):ut(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);const dt=D.stencilWrite;o.setTest(dt),dt&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),It(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?Mt(i.SAMPLE_ALPHA_TO_COVERAGE):Bt(i.SAMPLE_ALPHA_TO_COVERAGE)}function wt(D){I!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),I=D)}function _t(D){D!==vu?(Mt(i.CULL_FACE),D!==N&&(D===Al?i.cullFace(i.BACK):D===Mu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Bt(i.CULL_FACE),N=D}function Kt(D){D!==F&&(G&&i.lineWidth(D),F=D)}function It(D,Q,Y){D?(Mt(i.POLYGON_OFFSET_FILL),(L!==Q||z!==Y)&&(L=Q,z=Y,a.getReversed()&&(Q=-Q,Y=-Y),i.polygonOffset(Q,Y))):Bt(i.POLYGON_OFFSET_FILL)}function re(D){D?Mt(i.SCISSOR_TEST):Bt(i.SCISSOR_TEST)}function ae(D){D===void 0&&(D=i.TEXTURE0+X-1),tt!==D&&(i.activeTexture(D),tt=D)}function de(D,Q,Y){Y===void 0&&(tt===null?Y=i.TEXTURE0+X-1:Y=tt);let dt=nt[Y];dt===void 0&&(dt={type:void 0,texture:void 0},nt[Y]=dt),(dt.type!==D||dt.texture!==Q)&&(tt!==Y&&(i.activeTexture(Y),tt=Y),i.bindTexture(D,Q||Ft[D]),dt.type=D,dt.texture=Q)}function O(){const D=nt[tt];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function Ue(){try{i.compressedTexImage2D(...arguments)}catch(D){fe("WebGLState:",D)}}function ie(){try{i.compressedTexImage3D(...arguments)}catch(D){fe("WebGLState:",D)}}function ye(){try{i.texSubImage2D(...arguments)}catch(D){fe("WebGLState:",D)}}function mt(){try{i.texSubImage3D(...arguments)}catch(D){fe("WebGLState:",D)}}function De(){try{i.compressedTexSubImage2D(...arguments)}catch(D){fe("WebGLState:",D)}}function zt(){try{i.compressedTexSubImage3D(...arguments)}catch(D){fe("WebGLState:",D)}}function qt(){try{i.texStorage2D(...arguments)}catch(D){fe("WebGLState:",D)}}function R(){try{i.texStorage3D(...arguments)}catch(D){fe("WebGLState:",D)}}function y(){try{i.texImage2D(...arguments)}catch(D){fe("WebGLState:",D)}}function H(){try{i.texImage3D(...arguments)}catch(D){fe("WebGLState:",D)}}function st(D){return u[D]!==void 0?u[D]:i.getParameter(D)}function j(D,Q){u[D]!==Q&&(i.pixelStorei(D,Q),u[D]=Q)}function ct(D){Z.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),Z.copy(D))}function gt(D){vt.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),vt.copy(D))}function $(D,Q){let Y=c.get(Q);Y===void 0&&(Y=new WeakMap,c.set(Q,Y));let dt=Y.get(D);dt===void 0&&(dt=i.getUniformBlockIndex(Q,D.name),i.uniformBlockBinding(Q,dt,dt),Y.set(D,dt))}function J(D,Q,Y){const ot=c.get(Q).get(D);l[ot]!==Y&&(i.bindBufferBase(i.UNIFORM_BUFFER,ot,Y),l[ot]=Y)}function ft(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},tt=null,nt={},f={},l={},d=new WeakMap,p=[],_=null,m=!1,g=null,v=null,b=null,S=null,T=null,w=null,x=null,M=new Jt(0,0,0),C=0,A=!1,I=null,N=null,F=null,L=null,z=null,Z.set(0,0,i.canvas.width,i.canvas.height),vt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Mt,disable:Bt,bindFramebuffer:Te,drawBuffers:Ht,useProgram:ee,setBlending:ut,setMaterial:lt,setFlipSided:wt,setCullFace:_t,setLineWidth:Kt,setPolygonOffset:It,setScissorTest:re,activeTexture:ae,bindTexture:de,unbindTexture:O,compressedTexImage2D:Ue,compressedTexImage3D:ie,texImage2D:y,texImage3D:H,pixelStorei:j,getParameter:st,updateUBOMapping:$,uniformBlockBinding:J,texStorage2D:qt,texStorage3D:R,texSubImage2D:ye,texSubImage3D:mt,compressedTexSubImage2D:De,compressedTexSubImage3D:zt,scissor:ct,viewport:gt,reset:ft}}function _x(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new at,h=new WeakMap,u=new Set;let f;const d=new WeakMap,p=new Set,_=new FinalizationRegistry(R=>p.delete(R));let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,y){return m?new OffscreenCanvas(R,y):Hr("canvas")}function v(R,y,H){let st=1;const j=qt(R);if((j.width>H||j.height>H)&&(st=H/Math.max(j.width,j.height)),st<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const ct=Math.floor(st*j.width),gt=Math.floor(st*j.height);f===void 0&&(f=g(ct,gt));const $=y?g(ct,gt):f;return $.width=ct,$.height=gt,$.getContext("2d").drawImage(R,0,0,ct,gt),Xt("WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+ct+"x"+gt+")."),$}else return"data"in R&&Xt("WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),R;return R}function b(R){return R.generateMipmaps}function S(R){i.generateMipmap(R)}function T(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function w(R,y,H,st,j,ct=!1){if(R!==null){if(i[R]!==void 0)return i[R];Xt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let gt;st&&(gt=t.get("EXT_texture_norm16"),gt||Xt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let $=y;if(y===i.RED&&(H===i.FLOAT&&($=i.R32F),H===i.HALF_FLOAT&&($=i.R16F),H===i.UNSIGNED_BYTE&&($=i.R8),H===i.UNSIGNED_SHORT&&gt&&($=gt.R16_EXT),H===i.SHORT&&gt&&($=gt.R16_SNORM_EXT)),y===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&($=i.R8UI),H===i.UNSIGNED_SHORT&&($=i.R16UI),H===i.UNSIGNED_INT&&($=i.R32UI),H===i.BYTE&&($=i.R8I),H===i.SHORT&&($=i.R16I),H===i.INT&&($=i.R32I)),y===i.RG&&(H===i.FLOAT&&($=i.RG32F),H===i.HALF_FLOAT&&($=i.RG16F),H===i.UNSIGNED_BYTE&&($=i.RG8),H===i.UNSIGNED_SHORT&&gt&&($=gt.RG16_EXT),H===i.SHORT&&gt&&($=gt.RG16_SNORM_EXT)),y===i.RG_INTEGER&&(H===i.UNSIGNED_BYTE&&($=i.RG8UI),H===i.UNSIGNED_SHORT&&($=i.RG16UI),H===i.UNSIGNED_INT&&($=i.RG32UI),H===i.BYTE&&($=i.RG8I),H===i.SHORT&&($=i.RG16I),H===i.INT&&($=i.RG32I)),y===i.RGB_INTEGER&&(H===i.UNSIGNED_BYTE&&($=i.RGB8UI),H===i.UNSIGNED_SHORT&&($=i.RGB16UI),H===i.UNSIGNED_INT&&($=i.RGB32UI),H===i.BYTE&&($=i.RGB8I),H===i.SHORT&&($=i.RGB16I),H===i.INT&&($=i.RGB32I)),y===i.RGBA_INTEGER&&(H===i.UNSIGNED_BYTE&&($=i.RGBA8UI),H===i.UNSIGNED_SHORT&&($=i.RGBA16UI),H===i.UNSIGNED_INT&&($=i.RGBA32UI),H===i.BYTE&&($=i.RGBA8I),H===i.SHORT&&($=i.RGBA16I),H===i.INT&&($=i.RGBA32I)),y===i.RGB&&(H===i.UNSIGNED_SHORT&&gt&&($=gt.RGB16_EXT),H===i.SHORT&&gt&&($=gt.RGB16_SNORM_EXT),H===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),H===i.UNSIGNED_INT_10F_11F_11F_REV&&($=i.R11F_G11F_B10F)),y===i.RGBA){const J=ct?kr:ce.getTransfer(j);H===i.FLOAT&&($=i.RGBA32F),H===i.HALF_FLOAT&&($=i.RGBA16F),H===i.UNSIGNED_BYTE&&($=J===Se?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT&&gt&&($=gt.RGBA16_EXT),H===i.SHORT&&gt&&($=gt.RGBA16_SNORM_EXT),H===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function x(R,y){let H;return R?y===null||y===Gn||y===as?H=i.DEPTH24_STENCIL8:y===Rn?H=i.DEPTH32F_STENCIL8:y===Fs&&(H=i.DEPTH24_STENCIL8,Xt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Gn||y===as?H=i.DEPTH_COMPONENT24:y===Rn?H=i.DEPTH_COMPONENT32F:y===Fs&&(H=i.DEPTH_COMPONENT16),H}function M(R,y){return b(R)===!0||R.isFramebufferTexture&&R.minFilter!==$e&&R.minFilter!==un?Math.log2(Math.max(y.width,y.height))+1:R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?y.mipmaps.length:1}function C(R){const y=new WeakRef(R);n.get(R).__ref=y,p.add(y),_.register(R,y,y)}function A(R){const y=n.get(R).__ref;y!==void 0&&(p.delete(y),_.unregister(y))}function I(R){F(R.target)}function N(R){L(R.target)}function F(R){R.removeEventListener("dispose",I),A(R),X(R),R.isVideoTexture&&h.delete(R),R.isHTMLTexture&&u.delete(R)}function L(R){R.removeEventListener("dispose",N),A(R),it(R)}function z(){for(const R of p){const y=R.deref();y!==void 0&&(y.isRenderTarget===!0?L(y):F(y))}p.clear(),u.clear()}function X(R){const y=n.get(R);if(y.__webglInit===void 0)return;const H=R.source,st=d.get(H);if(st){const j=st[y.__cacheKey];j.usedTimes--,j.usedTimes===0&&G(R),Object.keys(st).length===0&&d.delete(H)}n.remove(R)}function G(R){const y=n.get(R);i.deleteTexture(y.__webglTexture);const H=R.source,st=d.get(H);delete st[y.__cacheKey],a.memory.textures--}function it(R){const y=n.get(R);y.__depthDisposeCallback&&y.__depthDisposeCallback();const H=R.depthTexture;if(H&&H.renderTarget===R&&F(H),R.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(y.__webglFramebuffer[j]))for(let ct=0;ct<y.__webglFramebuffer[j].length;ct++)i.deleteFramebuffer(y.__webglFramebuffer[j][ct]);else i.deleteFramebuffer(y.__webglFramebuffer[j]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[j])}else{if(Array.isArray(y.__webglFramebuffer))for(let j=0;j<y.__webglFramebuffer.length;j++)i.deleteFramebuffer(y.__webglFramebuffer[j]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let j=0;j<y.__webglColorRenderbuffer.length;j++)y.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[j]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const st=R.textures;for(let j=0,ct=st.length;j<ct;j++){const gt=n.get(st[j]);gt.__webglTexture&&(i.deleteTexture(gt.__webglTexture),a.memory.textures--),n.remove(st[j])}n.remove(R)}let q=0;function tt(){q=0}function nt(){return q}function Tt(R){q=R}function Gt(){const R=q;return R>=s.maxTextures&&Xt("WebGLTextures: Trying to use "+(R+1)+" texture units while this GPU supports only "+s.maxTextures),q+=1,R}function Z(R){const y=[];return y.push(R.wrapS),y.push(R.wrapT),y.push(R.wrapR||0),y.push(R.magFilter),y.push(R.minFilter),y.push(R.anisotropy),y.push(R.internalFormat),y.push(R.format),y.push(R.type),y.push(R.generateMipmaps),y.push(R.mipmapsAutoUpdate),y.push(R.premultiplyAlpha),y.push(R.flipY),y.push(R.unpackAlignment),y.push(R.colorSpace),y.join()}function vt(R,y){const H=n.get(R);if(R.isVideoTexture&&De(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&H.__version!==R.version){const st=R.image;if(st===null)Xt("WebGLRenderer: Texture marked for update but no image data found.");else if(st.complete===!1)Xt("WebGLRenderer: Texture marked for update but image is incomplete");else{lt(H,R,y);return}}else R.isExternalTexture&&(H.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+y)}function At(R,y){const H=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&H.__version!==R.version){lt(H,R,y);return}else R.isExternalTexture&&(H.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+y)}function Ft(R,y){const H=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&H.__version!==R.version){lt(H,R,y);return}e.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+y)}function Mt(R,y){const H=n.get(R);if(R.version>0&&H.__version!==R.version){wt(H,R,y);return}e.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+y)}const Bt={[rs]:i.REPEAT,[Jn]:i.CLAMP_TO_EDGE,[$a]:i.MIRRORED_REPEAT},Te={[$e]:i.NEAREST,[Hu]:i.NEAREST_MIPMAP_NEAREST,[Qs]:i.NEAREST_MIPMAP_LINEAR,[un]:i.LINEAR,[ca]:i.LINEAR_MIPMAP_NEAREST,[pi]:i.LINEAR_MIPMAP_LINEAR},Ht={[qu]:i.NEVER,[fh]:i.ALWAYS,[Yu]:i.LESS,[hh]:i.LEQUAL,[Zu]:i.EQUAL,[uh]:i.GEQUAL,[$u]:i.GREATER,[Ju]:i.NOTEQUAL};function ee(R,y){if(y.type===Rn&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===un||y.magFilter===ca||y.magFilter===Qs||y.magFilter===pi||y.minFilter===un||y.minFilter===ca||y.minFilter===Qs||y.minFilter===pi)&&Xt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,Bt[y.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,Bt[y.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,Bt[y.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,Te[y.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,Te[y.minFilter]),y.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,Ht[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===$e||y.minFilter!==Qs&&y.minFilter!==pi||y.type===Rn&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const H=t.get("EXT_texture_filter_anisotropic");i.texParameterf(R,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function se(R,y){let H=!1;R.__webglInit===void 0&&(R.__webglInit=!0,y.addEventListener("dispose",I),C(y));const st=y.source;let j=d.get(st);j===void 0&&(j={},d.set(st,j));const ct=Z(y);if(ct!==R.__cacheKey){j[ct]===void 0&&(j[ct]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,H=!0),j[ct].usedTimes++;const gt=j[R.__cacheKey];gt!==void 0&&(j[R.__cacheKey].usedTimes--,gt.usedTimes===0&&G(y)),R.__cacheKey=ct,R.__webglTexture=j[ct].texture}return H}function et(R,y,H){return Math.floor(Math.floor(R/H)/y)}function ut(R,y,H,st){const ct=R.updateRanges;if(ct.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,y.width,y.height,H,st,y.data);else{ct.sort((D,Q)=>D.start-Q.start);let gt=0;for(let D=1;D<ct.length;D++){const Q=ct[gt],Y=ct[D],dt=Q.start+Q.count,ot=et(Y.start,y.width,4),ht=et(Q.start,y.width,4);Y.start<=dt+1&&ot===ht&&et(Y.start+Y.count-1,y.width,4)===ot?Q.count=Math.max(Q.count,Y.start+Y.count-Q.start):(++gt,ct[gt]=Y)}ct.length=gt+1;const $=e.getParameter(i.UNPACK_ROW_LENGTH),J=e.getParameter(i.UNPACK_SKIP_PIXELS),ft=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,y.width);for(let D=0,Q=ct.length;D<Q;D++){const Y=ct[D],dt=Math.floor(Y.start/4),ot=Math.ceil(Y.count/4),ht=dt%y.width,Dt=Math.floor(dt/y.width),jt=ot,rt=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,ht),e.pixelStorei(i.UNPACK_SKIP_ROWS,Dt),e.texSubImage2D(i.TEXTURE_2D,0,ht,Dt,jt,rt,H,st,y.data)}R.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,$),e.pixelStorei(i.UNPACK_SKIP_PIXELS,J),e.pixelStorei(i.UNPACK_SKIP_ROWS,ft)}}function lt(R,y,H){let st=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(st=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(st=i.TEXTURE_3D);const j=se(R,y),ct=y.source;e.bindTexture(st,R.__webglTexture,i.TEXTURE0+H);const gt=n.get(ct);if(ct.version!==gt.__version||j===!0){if(e.activeTexture(i.TEXTURE0+H),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){const rt=ce.getPrimaries(ce.workingColorSpace),Ot=y.colorSpace===di?null:ce.getPrimaries(y.colorSpace),Qt=y.colorSpace===di||rt===Ot?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Qt)}e.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment);let J=v(y.image,!1,s.maxTextureSize);J=zt(y,J);const ft=r.convert(y.format,y.colorSpace),D=r.convert(y.type);let Q=w(y.internalFormat,ft,D,y.normalized,y.colorSpace,y.isVideoTexture);ee(st,y);let Y;const dt=y.mipmaps,ot=y.isVideoTexture!==!0,ht=gt.__version===void 0||j===!0,Dt=ct.dataReady,jt=M(y,J);if(y.isDepthTexture)Q=x(y.format===mi,y.type),ht&&(ot?e.texStorage2D(i.TEXTURE_2D,1,Q,J.width,J.height):e.texImage2D(i.TEXTURE_2D,0,Q,J.width,J.height,0,ft,D,null));else if(y.isDataTexture)if(dt.length>0){ot&&ht&&e.texStorage2D(i.TEXTURE_2D,jt,Q,dt[0].width,dt[0].height);for(let rt=0,Ot=dt.length;rt<Ot;rt++)Y=dt[rt],ot?Dt&&e.texSubImage2D(i.TEXTURE_2D,rt,0,0,Y.width,Y.height,ft,D,Y.data):e.texImage2D(i.TEXTURE_2D,rt,Q,Y.width,Y.height,0,ft,D,Y.data);y.generateMipmaps=!1}else ot?(ht&&e.texStorage2D(i.TEXTURE_2D,jt,Q,J.width,J.height),Dt&&ut(y,J,ft,D)):e.texImage2D(i.TEXTURE_2D,0,Q,J.width,J.height,0,ft,D,J.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){ot&&ht&&e.texStorage3D(i.TEXTURE_2D_ARRAY,jt,Q,dt[0].width,dt[0].height,J.depth);for(let rt=0,Ot=dt.length;rt<Ot;rt++)if(Y=dt[rt],y.format!==Un)if(ft!==null)if(ot){if(Dt)if(y.layerUpdates.size>0){const Qt=gc(Y.width,Y.height,y.format,y.type);for(const St of y.layerUpdates){const Me=Y.data.subarray(St*Qt/Y.data.BYTES_PER_ELEMENT,(St+1)*Qt/Y.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,rt,0,0,St,Y.width,Y.height,1,ft,Me)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,rt,0,0,0,Y.width,Y.height,J.depth,ft,Y.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,rt,Q,Y.width,Y.height,J.depth,0,Y.data,0,0);else Xt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ot?Dt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,rt,0,0,0,Y.width,Y.height,J.depth,ft,D,Y.data):e.texImage3D(i.TEXTURE_2D_ARRAY,rt,Q,Y.width,Y.height,J.depth,0,ft,D,Y.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{ot&&ht&&e.texStorage2D(i.TEXTURE_2D,jt,Q,dt[0].width,dt[0].height);for(let rt=0,Ot=dt.length;rt<Ot;rt++)Y=dt[rt],y.format!==Un?ft!==null?ot?Dt&&e.compressedTexSubImage2D(i.TEXTURE_2D,rt,0,0,Y.width,Y.height,ft,Y.data):e.compressedTexImage2D(i.TEXTURE_2D,rt,Q,Y.width,Y.height,0,Y.data):Xt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ot?Dt&&e.texSubImage2D(i.TEXTURE_2D,rt,0,0,Y.width,Y.height,ft,D,Y.data):e.texImage2D(i.TEXTURE_2D,rt,Q,Y.width,Y.height,0,ft,D,Y.data)}else if(y.isDataArrayTexture)if(ot){if(ht&&e.texStorage3D(i.TEXTURE_2D_ARRAY,jt,Q,J.width,J.height,J.depth),Dt)if(y.layerUpdates.size>0){const rt=gc(J.width,J.height,y.format,y.type);for(const Ot of y.layerUpdates){const Qt=J.data.subarray(Ot*rt/J.data.BYTES_PER_ELEMENT,(Ot+1)*rt/J.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Ot,J.width,J.height,1,ft,D,Qt)}y.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,ft,D,J.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Q,J.width,J.height,J.depth,0,ft,D,J.data);else if(y.isData3DTexture)ot?(ht&&e.texStorage3D(i.TEXTURE_3D,jt,Q,J.width,J.height,J.depth),Dt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,ft,D,J.data)):e.texImage3D(i.TEXTURE_3D,0,Q,J.width,J.height,J.depth,0,ft,D,J.data);else if(y.isFramebufferTexture){if(ht)if(ot)e.texStorage2D(i.TEXTURE_2D,jt,Q,J.width,J.height);else{let rt=J.width,Ot=J.height;for(let Qt=0;Qt<jt;Qt++)e.texImage2D(i.TEXTURE_2D,Qt,Q,rt,Ot,0,ft,D,null),rt>>=1,Ot>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in i){const rt=i.canvas;if(rt.hasAttribute("layoutsubtree")||rt.setAttribute("layoutsubtree","true"),J.parentNode!==rt){rt.appendChild(J),u.add(y),rt.onpaint=Ot=>{const Qt=Ot.changedElements;for(const St of u)Qt.includes(St.image)&&(St.needsUpdate=!0)},rt.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,J);else{const Qt=i.RGBA,St=i.RGBA,Me=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Qt,St,Me,J)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(dt.length>0){if(ot&&ht){const rt=qt(dt[0]);e.texStorage2D(i.TEXTURE_2D,jt,Q,rt.width,rt.height)}for(let rt=0,Ot=dt.length;rt<Ot;rt++)Y=dt[rt],ot?Dt&&e.texSubImage2D(i.TEXTURE_2D,rt,0,0,ft,D,Y):e.texImage2D(i.TEXTURE_2D,rt,Q,ft,D,Y);y.generateMipmaps=!1}else if(ot){if(ht){const rt=qt(J);e.texStorage2D(i.TEXTURE_2D,jt,Q,rt.width,rt.height)}Dt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ft,D,J)}else e.texImage2D(i.TEXTURE_2D,0,Q,ft,D,J);b(y)&&y.mipmapsAutoUpdate===!0&&S(st),gt.__version=ct.version,y.onUpdate&&y.onUpdate(y)}R.__version=y.version}function wt(R,y,H){if(y.image.length!==6)return;const st=se(R,y),j=y.source;e.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+H);const ct=n.get(j);if(j.version!==ct.__version||st===!0){e.activeTexture(i.TEXTURE0+H);const gt=ce.getPrimaries(ce.workingColorSpace),$=y.colorSpace===di?null:ce.getPrimaries(y.colorSpace),J=y.colorSpace===di||gt===$?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,J);const ft=y.isCompressedTexture||y.image[0].isCompressedTexture,D=y.image[0]&&y.image[0].isDataTexture,Q=[];for(let St=0;St<6;St++)!ft&&!D?Q[St]=v(y.image[St],!0,s.maxCubemapSize):Q[St]=D?y.image[St].image:y.image[St],Q[St]=zt(y,Q[St]);const Y=Q[0],dt=r.convert(y.format,y.colorSpace),ot=r.convert(y.type);let ht=w(y.internalFormat,dt,ot,y.normalized,y.colorSpace);const Dt=y.isVideoTexture!==!0,jt=ct.__version===void 0||st===!0,rt=j.dataReady;let Ot=M(y,Y);ee(i.TEXTURE_CUBE_MAP,y);let Qt;if(y.isDepthTexture){if(ht=x(y.format===mi,y.type),jt)if(Dt)e.texStorage2D(i.TEXTURE_CUBE_MAP,1,ht,Y.width,Y.height);else for(let St=0;St<6;St++)e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+St,0,ht,Y.width,Y.height,0,dt,ot,null)}else if(ft){Dt&&jt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Ot,ht,Y.width,Y.height);for(let St=0;St<6;St++){Qt=Q[St].mipmaps;for(let Me=0;Me<Qt.length;Me++){const Ve=Qt[Me];y.format!==Un?dt!==null?Dt?rt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+St,Me,0,0,Ve.width,Ve.height,dt,Ve.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+St,Me,ht,Ve.width,Ve.height,0,Ve.data):Xt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Dt?rt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+St,Me,0,0,Ve.width,Ve.height,dt,ot,Ve.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+St,Me,ht,Ve.width,Ve.height,0,dt,ot,Ve.data)}}}else{if(Qt=y.mipmaps,Dt&&jt){Qt.length>0&&Ot++;const St=qt(Q[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Ot,ht,St.width,St.height)}for(let St=0;St<6;St++)if(D){Dt?rt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+St,0,0,0,Q[St].width,Q[St].height,dt,ot,Q[St].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+St,0,ht,Q[St].width,Q[St].height,0,dt,ot,Q[St].data);for(let Me=0;Me<Qt.length;Me++){const ri=Qt[Me].image[St].image;Dt?rt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+St,Me+1,0,0,ri.width,ri.height,dt,ot,ri.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+St,Me+1,ht,ri.width,ri.height,0,dt,ot,ri.data)}}else{Dt?rt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+St,0,0,0,dt,ot,Q[St]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+St,0,ht,dt,ot,Q[St]);for(let Me=0;Me<Qt.length;Me++){const Ve=Qt[Me];Dt?rt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+St,Me+1,0,0,dt,ot,Ve.image[St]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+St,Me+1,ht,dt,ot,Ve.image[St])}}}b(y)&&y.mipmapsAutoUpdate===!0&&S(i.TEXTURE_CUBE_MAP),ct.__version=j.version,y.onUpdate&&y.onUpdate(y)}R.__version=y.version}function _t(R,y,H,st,j,ct){const gt=r.convert(H.format,H.colorSpace),$=r.convert(H.type),J=w(H.internalFormat,gt,$,H.normalized,H.colorSpace),ft=n.get(y),D=n.get(H);if(D.__renderTarget=y,!ft.__hasExternalTextures){const Q=Math.max(1,y.width>>ct),Y=Math.max(1,y.height>>ct);j===i.TEXTURE_3D||j===i.TEXTURE_2D_ARRAY?e.texImage3D(j,ct,J,Q,Y,y.depth,0,gt,$,null):e.texImage2D(j,ct,J,Q,Y,0,gt,$,null)}e.bindFramebuffer(i.FRAMEBUFFER,R),mt(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,st,j,D.__webglTexture,0,ye(y)):(j===i.TEXTURE_2D||j>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,st,j,D.__webglTexture,ct),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Kt(R,y,H){if(i.bindRenderbuffer(i.RENDERBUFFER,R),y.depthBuffer){const st=y.depthTexture,j=st&&st.isDepthTexture?st.type:null,ct=x(y.stencilBuffer,j),gt=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;mt(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ye(y),ct,y.width,y.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,ye(y),ct,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,ct,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,gt,i.RENDERBUFFER,R)}else{const st=y.textures;for(let j=0;j<st.length;j++){const ct=st[j],gt=r.convert(ct.format,ct.colorSpace),$=r.convert(ct.type),J=w(ct.internalFormat,gt,$,ct.normalized,ct.colorSpace);mt(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ye(y),J,y.width,y.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,ye(y),J,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,J,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function It(R,y,H){const st=y.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,R),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const j=n.get(y.depthTexture);j.__renderTarget=y;const ct=st?y.depthTexture.image[0]:y.depthTexture.image;(!j.__webglTexture||ct.width!==y.width||ct.height!==y.height)&&(ct.width=y.width,ct.height=y.height,y.depthTexture.needsUpdate=!0),st?Mt(y.depthTexture,0):vt(y.depthTexture,0);const gt=j.__webglTexture,$=ye(y),J=st?i.TEXTURE_CUBE_MAP_POSITIVE_X+H:i.TEXTURE_2D,ft=y.depthTexture.format===mi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(y.depthTexture.format===gi)mt(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ft,J,gt,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,ft,J,gt,0);else if(y.depthTexture.format===mi)mt(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ft,J,gt,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,ft,J,gt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function re(R){const y=n.get(R),H=R.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==R.depthTexture){const st=R.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),st){const j=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,st.removeEventListener("dispose",j)};st.addEventListener("dispose",j),y.__depthDisposeCallback=j}y.__boundDepthTexture=st}if(R.depthTexture&&!y.__autoAllocateDepthBuffer)if(H)for(let st=0;st<6;st++)It(y.__webglFramebuffer[st],R,st);else R.texture.mipmaps.length>0?It(y.__webglFramebuffer[0],R,0):It(y.__webglFramebuffer,R,0);else if(H){y.__webglDepthbuffer=[];for(let st=0;st<6;st++)if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[st]),y.__webglDepthbuffer[st]===void 0)y.__webglDepthbuffer[st]=i.createRenderbuffer(),Kt(y.__webglDepthbuffer[st],R,!1);else{const j=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ct=y.__webglDepthbuffer[st];i.bindRenderbuffer(i.RENDERBUFFER,ct),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,ct)}}else if(R.texture.mipmaps.length>0?e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),Kt(y.__webglDepthbuffer,R,!1);else{const j=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ct=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ct),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,ct)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function ae(R,y,H){const st=n.get(R);y!==void 0&&_t(st.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&re(R)}function de(R){const y=R.texture,H=n.get(R),st=n.get(y);R.addEventListener("dispose",N),C(R);const j=R.textures,ct=R.isWebGLCubeRenderTarget===!0,gt=j.length>1;if(gt||(st.__webglTexture===void 0&&(st.__webglTexture=i.createTexture()),st.__version=y.version,a.memory.textures++),ct){H.__webglFramebuffer=[];for(let $=0;$<6;$++)if(y.mipmaps.length>0){H.__webglFramebuffer[$]=[];for(let J=0;J<y.mipmaps.length;J++)H.__webglFramebuffer[$][J]=i.createFramebuffer()}else H.__webglFramebuffer[$]=i.createFramebuffer()}else{if(y.mipmaps.length>0){H.__webglFramebuffer=[];for(let $=0;$<y.mipmaps.length;$++)H.__webglFramebuffer[$]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(gt)for(let $=0,J=j.length;$<J;$++){const ft=n.get(j[$]);ft.__webglTexture===void 0&&(ft.__webglTexture=i.createTexture(),a.memory.textures++)}if(R.samples>0&&mt(R)===!1){H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let $=0;$<j.length;$++){const J=j[$];H.__webglColorRenderbuffer[$]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[$]);const ft=r.convert(J.format,J.colorSpace),D=r.convert(J.type),Q=w(J.internalFormat,ft,D,J.normalized,J.colorSpace,R.isXRRenderTarget===!0),Y=ye(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,Y,Q,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+$,i.RENDERBUFFER,H.__webglColorRenderbuffer[$])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),Kt(H.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ct){e.bindTexture(i.TEXTURE_CUBE_MAP,st.__webglTexture),ee(i.TEXTURE_CUBE_MAP,y);for(let $=0;$<6;$++)if(y.mipmaps.length>0)for(let J=0;J<y.mipmaps.length;J++)_t(H.__webglFramebuffer[$][J],R,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+$,J);else _t(H.__webglFramebuffer[$],R,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);b(y)?S(i.TEXTURE_CUBE_MAP):y.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,y.mipmaps.length-1),e.unbindTexture()}else if(gt){for(let $=0,J=j.length;$<J;$++){const ft=j[$],D=n.get(ft);let Q=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(Q=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Q,D.__webglTexture),ee(Q,ft),_t(H.__webglFramebuffer,R,ft,i.COLOR_ATTACHMENT0+$,Q,0),b(ft)&&S(Q)}e.unbindTexture()}else{let $=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&($=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture($,st.__webglTexture),ee($,y),y.mipmaps.length>0)for(let J=0;J<y.mipmaps.length;J++)_t(H.__webglFramebuffer[J],R,y,i.COLOR_ATTACHMENT0,$,J);else _t(H.__webglFramebuffer,R,y,i.COLOR_ATTACHMENT0,$,0);b(y)?S($):y.mipmaps.length>0&&i.texParameteri($,i.TEXTURE_MAX_LEVEL,y.mipmaps.length-1),e.unbindTexture()}R.depthBuffer&&re(R)}function O(R){const y=R.textures;for(let H=0,st=y.length;H<st;H++){const j=y[H];if(b(j)&&j.mipmapsAutoUpdate===!0){const ct=T(R),gt=n.get(j).__webglTexture;e.bindTexture(ct,gt),S(ct),e.unbindTexture()}}}const Ue=[];function ie(R){if(R.samples>0){if(mt(R)===!1){const y=R.textures,H=R.width,st=R.height;let j=i.COLOR_BUFFER_BIT;const ct=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,gt=n.get(R),$=y.length>1;if($)for(let ft=0;ft<y.length;ft++)e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ft,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ft,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,gt.__webglMultisampledFramebuffer),R.texture.mipmaps.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglFramebuffer);for(let ft=0;ft<y.length;ft++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(j|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(j|=i.STENCIL_BUFFER_BIT)),$){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,gt.__webglColorRenderbuffer[ft]);const D=n.get(y[ft]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,D,0)}i.blitFramebuffer(0,0,H,st,0,0,H,st,j,i.NEAREST),l===!0&&(Ue.length=0,Ue.push(i.COLOR_ATTACHMENT0+ft),R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&Ue.push(ct),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ue))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),$)for(let ft=0;ft<y.length;ft++){e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ft,i.RENDERBUFFER,gt.__webglColorRenderbuffer[ft]);const D=n.get(y[ft]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ft,i.TEXTURE_2D,D,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&l){const y=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function ye(R){return Math.min(s.maxSamples,R.samples)}function mt(R){const y=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function De(R){const y=a.render.frame;h.get(R)!==y&&(h.set(R,y),R.update())}function zt(R,y){const H=R.colorSpace,st=R.format,j=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||H!==Gr&&H!==di&&(ce.getTransfer(H)===Se?(st!==Un||j!==xn)&&Xt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):fe("WebGLTextures: Unsupported texture color space:",H)),y}function qt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=Gt,this.resetTextureUnits=tt,this.getTextureUnits=nt,this.setTextureUnits=Tt,this.setTexture2D=vt,this.setTexture2DArray=At,this.setTexture3D=Ft,this.setTextureCube=Mt,this.rebindTextures=ae,this.setupRenderTarget=de,this.updateRenderTargetMipmap=O,this.updateMultisampleRenderTarget=ie,this.setupDepthRenderbuffer=re,this.setupFrameBufferTexture=_t,this.useMultisampledRTT=mt,this.dispose=z}function vx(i,t){function e(n,s=di){let r;const a=ce.getTransfer(s);if(n===xn)return i.UNSIGNED_BYTE;if(n===ko)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ho)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ah)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===oh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===sh)return i.BYTE;if(n===rh)return i.SHORT;if(n===Fs)return i.UNSIGNED_SHORT;if(n===Go)return i.INT;if(n===Gn)return i.UNSIGNED_INT;if(n===Rn)return i.FLOAT;if(n===kn)return i.HALF_FLOAT;if(n===lh)return i.ALPHA;if(n===ch)return i.RGB;if(n===Un)return i.RGBA;if(n===gi)return i.DEPTH_COMPONENT;if(n===mi)return i.DEPTH_STENCIL;if(n===Vo)return i.RED;if(n===Wo)return i.RED_INTEGER;if(n===Ri)return i.RG;if(n===Xo)return i.RG_INTEGER;if(n===qo)return i.RGBA_INTEGER;if(n===Dr||n===Nr||n===Ur||n===Or)if(a===Se)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Dr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Nr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ur)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Or)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Dr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Nr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ur)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Or)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ja||n===Ka||n===Qa||n===ja)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ja)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ka)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Qa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ja)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===to||n===eo||n===no||n===io||n===so||n===Br||n===ro)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===to||n===eo)return a===Se?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===no)return a===Se?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===io)return r.COMPRESSED_R11_EAC;if(n===so)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Br)return r.COMPRESSED_RG11_EAC;if(n===ro)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ao||n===oo||n===lo||n===co||n===ho||n===uo||n===fo||n===po||n===mo||n===go||n===xo||n===_o||n===vo||n===Mo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ao)return a===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===oo)return a===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===lo)return a===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===co)return a===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ho)return a===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===uo)return a===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===fo)return a===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===po)return a===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===mo)return a===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===go)return a===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===xo)return a===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===_o)return a===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===vo)return a===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Mo)return a===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===So||n===yo||n===Eo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===So)return a===Se?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===yo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Eo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===bo||n===wo||n===zr||n===To)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===bo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===wo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===zr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===To)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===as?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const Mx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Sx=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class yx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Rh(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new ni({vertexShader:Mx,fragmentShader:Sx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new K(new Ze(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Ex extends Li{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,p=null;const _=typeof XRWebGLBinding<"u",m=new yx,g={},v=e.getContextAttributes();let b=null,S=null;const T=[],w=[],x=new at;let M=null,C=null;const A=new gn;A.viewport=new Pe;const I=new gn;I.viewport=new Pe;const N=[A,I],F=new Ud;let L=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let vt=T[Z];return vt===void 0&&(vt=new ga,T[Z]=vt),vt.getTargetRaySpace()},this.getControllerGrip=function(Z){let vt=T[Z];return vt===void 0&&(vt=new ga,T[Z]=vt),vt.getGripSpace()},this.getHand=function(Z){let vt=T[Z];return vt===void 0&&(vt=new ga,T[Z]=vt),vt.getHandSpace()};function X(Z){const vt=w.indexOf(Z.inputSource);if(vt===-1)return;const At=T[vt];At!==void 0&&(At.update(Z.inputSource,Z.frame,c||a),At.dispatchEvent({type:Z.type,data:Z.inputSource}))}function G(){s.removeEventListener("select",X),s.removeEventListener("selectstart",X),s.removeEventListener("selectend",X),s.removeEventListener("squeeze",X),s.removeEventListener("squeezestart",X),s.removeEventListener("squeezeend",X),s.removeEventListener("end",G),s.removeEventListener("inputsourceschange",it);for(let Z=0;Z<T.length;Z++){const vt=w[Z];vt!==null&&(w[Z]=null,T[Z].disconnect(vt))}L=null,z=null,m.reset();for(const Z in g)delete g[Z];if(t.setRenderTarget(b),d=null,f=null,u=null,s=null,S=null,Gt.stop(),n.isPresenting=!1,t.setPixelRatio(M),t.setSize(x.width,x.height,!1),C!==null){const Z=C.camera;Z.fov=C.fov,Z.zoom=C.zoom,Z.updateProjectionMatrix(),C=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&Xt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&Xt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(b=t.getRenderTarget(),s.addEventListener("select",X),s.addEventListener("selectstart",X),s.addEventListener("selectend",X),s.addEventListener("squeeze",X),s.addEventListener("squeezestart",X),s.addEventListener("squeezeend",X),s.addEventListener("end",G),s.addEventListener("inputsourceschange",it),v.xrCompatible!==!0&&await e.makeXRCompatible(),M=t.getPixelRatio(),t.getSize(x),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let At=null,Ft=null,Mt=null;v.depth&&(Mt=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,At=v.stencil?mi:gi,Ft=v.stencil?as:Gn);const Bt={colorFormat:e.RGBA8,depthFormat:Mt,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Bt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),S=new Fn(f.textureWidth,f.textureHeight,{format:Un,type:xn,depthTexture:new ls(f.textureWidth,f.textureHeight,Ft,void 0,void 0,void 0,void 0,void 0,void 0,At),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{const At={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,At),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),S=new Fn(d.framebufferWidth,d.framebufferHeight,{format:Un,type:xn,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Gt.setContext(s),Gt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function it(Z){for(let vt=0;vt<Z.removed.length;vt++){const At=Z.removed[vt],Ft=w.indexOf(At);Ft>=0&&(w[Ft]=null,T[Ft].disconnect(At))}for(let vt=0;vt<Z.added.length;vt++){const At=Z.added[vt];let Ft=w.indexOf(At);if(Ft===-1){for(let Bt=0;Bt<T.length;Bt++)if(Bt>=w.length){w.push(At),Ft=Bt;break}else if(w[Bt]===null){w[Bt]=At,Ft=Bt;break}if(Ft===-1)break}const Mt=T[Ft];Mt&&Mt.connect(At)}}function q(Z,vt){vt===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(vt.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let vt=Z.near,At=Z.far;m.texture!==null&&(m.depthNear>0&&(vt=m.depthNear),m.depthFar>0&&(At=m.depthFar)),F.near=I.near=A.near=vt,F.far=I.far=A.far=At,(L!==F.near||z!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),L=F.near,z=F.far),F.layers.mask=Z.layers.mask|6,A.layers.mask=F.layers.mask&-5,I.layers.mask=F.layers.mask&-3;const Ft=Z.parent,Mt=F.cameras;q(F,Ft);for(let Bt=0;Bt<Mt.length;Bt++)q(Mt[Bt],Ft);F.projectionMatrix.copy(A.projectionMatrix),F.projectionMatrixInverse.copy(A.projectionMatrixInverse),C===null&&Z.isPerspectiveCamera&&(C={camera:Z,fov:Z.fov,zoom:Z.zoom}),tt(Z,F,Ft)};function tt(Z,vt,At){At===null?Z.matrix.copy(vt.matrixWorld):(Z.matrix.copy(At.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(vt.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(vt.projectionMatrix),Z.projectionMatrixInverse.copy(vt.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=os*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(Z){l=Z,f!==null&&(f.fixedFoveation=Z),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Z)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(F)},this.getCameraTexture=function(Z){return g[Z]};let nt=null;function Tt(Z,vt){if(h=vt.getViewerPose(c||a),p=vt,h!==null){const At=h.views;d!==null&&(t.setRenderTargetFramebuffer(S,d.framebuffer),t.setRenderTarget(S));let Ft=!1;At.length!==F.cameras.length&&(F.cameras.length=0,Ft=!0);for(let Ht=0;Ht<At.length;Ht++){const ee=At[Ht];let se=null;if(d!==null)se=d.getViewport(ee);else{const ut=u.getViewSubImage(f,ee);se=ut.viewport,Ht===0&&(t.setRenderTargetTextures(S,ut.colorTexture,ut.depthStencilTexture),t.setRenderTarget(S))}let et=N[Ht];et===void 0&&(et=new gn,et.layers.enable(Ht),et.viewport=new Pe,N[Ht]=et),et.matrix.fromArray(ee.transform.matrix),et.matrix.decompose(et.position,et.quaternion,et.scale),et.projectionMatrix.fromArray(ee.projectionMatrix),et.projectionMatrixInverse.copy(et.projectionMatrix).invert(),et.viewport.set(se.x,se.y,se.width,se.height),Ht===0&&(F.matrix.copy(et.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Ft===!0&&F.cameras.push(et)}const Mt=s.enabledFeatures;if(Mt&&Mt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){u=n.getBinding();const Ht=u.getDepthInformation(At[0]);Ht&&Ht.isValid&&Ht.texture&&m.init(Ht,s.renderState)}if(Mt&&Mt.includes("camera-access")&&_){t.state.unbindTexture(),u=n.getBinding();for(let Ht=0;Ht<At.length;Ht++){const ee=At[Ht].camera;if(ee){let se=g[ee];se||(se=new Rh,g[ee]=se);const et=u.getCameraImage(ee);se.sourceTexture=et}}}}for(let At=0;At<T.length;At++){const Ft=w[At],Mt=T[At];Ft!==null&&Mt!==void 0&&Mt.update(Ft,vt,c||a)}nt&&nt(Z,vt),vt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:vt}),p=null}const Gt=new Gh;Gt.setAnimationLoop(Tt),this.setAnimationLoop=function(Z){nt=Z},this.dispose=function(){}}}const bx=new _e,Jh=new Yt;Jh.set(-1,0,0,0,1,0,0,0,1);function wx(i,t){function e(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function n(m,g){g.color.getRGB(m.fogColor.value,Fh(i)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function s(m,g,v,b,S){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(m,g):g.isMeshLambertMaterial?(r(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(m,g),u(m,g)):g.isMeshPhongMaterial?(r(m,g),h(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(m,g),f(m,g),g.isMeshPhysicalMaterial&&d(m,g,S)):g.isMeshMatcapMaterial?(r(m,g),p(m,g)):g.isMeshDepthMaterial?r(m,g):g.isMeshDistanceMaterial?(r(m,g),_(m,g)):g.isMeshNormalMaterial?r(m,g):g.isLineBasicMaterial?(a(m,g),g.isLineDashedMaterial&&o(m,g)):g.isPointsMaterial?l(m,g,v,b):g.isSpriteMaterial?c(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,e(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===cn&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,e(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===cn&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,e(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,e(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);const v=t.get(g),b=v.envMap,S=v.envMapRotation;b&&(m.envMap.value=b,m.envMapRotation.value.setFromMatrix4(bx.makeRotationFromEuler(S)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Jh),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,m.aoMapTransform))}function a(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform))}function o(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function l(m,g,v,b){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*v,m.scale.value=b*.5,g.map&&(m.map.value=g.map,e(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function c(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function h(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function u(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function f(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function d(m,g,v){m.ior.value=g.ior,g.diffuseRoughness>0&&(m.diffuseRoughness.value=g.diffuseRoughness,g.diffuseRoughnessMap&&(m.diffuseRoughnessMap.value=g.diffuseRoughnessMap,e(g.diffuseRoughnessMap,m.diffuseRoughnessMapTransform))),g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===cn&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.retroreflectivity>0&&(m.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessMinimum,m.iridescenceThicknessMaximum.value=g.iridescenceThicknessMaximum,g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function _(m,g){const v=t.get(g).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Tx(i,t,e,n){let s={},r={};function a(v,b){const S=b.program;n.uniformBlockBinding(v,S,s[v.id])}function o(v,b){let S=s[v.id];S===void 0&&(p(v),S=l(v),s[v.id]=S,v.addEventListener("dispose",m));const T=b.program;n.updateUBOMapping(v,T);const w=t.render.frame;r[v.id]!==w&&(c(v),r[v.id]=w)}function l(v){const b=i.createBuffer(),S=v.__size,T=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,S,T),i.bindBuffer(i.UNIFORM_BUFFER,null),b}function c(v){const b=s[v.id],S=v.uniforms,T=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let w=0,x=S.length;w<x;w++){const M=S[w];if(Array.isArray(M))for(let C=0,A=M.length;C<A;C++)h(M[C],w,C,T);else h(M,w,0,T)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(v,b,S,T){if(f(v,b,S,T)===!0){const w=v.__offset,x=v.value;if(Array.isArray(x)){let M=0;for(let C=0;C<x.length;C++){const A=x[C],I=_(A,!0);u(A,v.__data,M),M+=I.storage/Float32Array.BYTES_PER_ELEMENT}}else u(x,v.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,w,v.__data)}}function u(v,b,S){typeof v=="number"||typeof v=="boolean"?b[S]=v:v.isMatrix3?(b[S]=v.elements[0],b[S+1]=v.elements[1],b[S+2]=v.elements[2],b[S+3]=0,b[S+4]=v.elements[3],b[S+5]=v.elements[4],b[S+6]=v.elements[5],b[S+7]=0,b[S+8]=v.elements[6],b[S+9]=v.elements[7],b[S+10]=v.elements[8],b[S+11]=0):ArrayBuffer.isView(v)?b.set(v.subarray(0,b.length-S),S):v.toArray(b,S)}function f(v,b,S,T){const w=v.value,x=b+"_"+S;if(Array.isArray(w)){T[x]===void 0&&(T[x]=[]);const M=T[x];let C=!1;for(let A=0;A<w.length;A++)d(w[A],M,A)===!0&&(C=!0);return C}return d(w,T,x)}function d(v,b,S){if(b[S]===void 0)return typeof v=="number"||typeof v=="boolean"?b[S]=v:ArrayBuffer.isView(v)?b[S]=v.slice():b[S]=v.clone(),!0;{const T=b[S];if(typeof v=="number"||typeof v=="boolean"){if(T!==v)return b[S]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(T.equals(v)===!1)return T.copy(v),!0}}return!1}function p(v){const b=v.uniforms;let S=0;const T=16;for(let x=0,M=b.length;x<M;x++){const C=Array.isArray(b[x])?b[x]:[b[x]];for(let A=0,I=C.length;A<I;A++){const N=C[A],F=Array.isArray(N.value)?N.value:[N.value],L=Array.isArray(b[x])||Array.isArray(N.value);let z=S;for(let G=0,it=F.length;G<it;G++){const q=F[G],tt=_(q,L),nt=S%T,Tt=nt%tt.boundary,Gt=nt+Tt;S+=Tt,Gt!==0&&T-Gt<tt.storage&&(S+=T-Gt),G===0&&(z=S),S+=tt.storage}const X=N.type==="int"?Int32Array:N.type==="uint"?Uint32Array:Float32Array;N.__data=new X((S-z)/Float32Array.BYTES_PER_ELEMENT),N.__offset=z}}const w=S%T;return w>0&&(S+=T-w),v.__size=S,v.__cache={},this}function _(v,b){const S={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(S.boundary=4,S.storage=4):v.isVector2?(S.boundary=8,S.storage=8):v.isVector3||v.isColor?(S.boundary=16,S.storage=12):v.isVector4?(S.boundary=16,S.storage=16):v.isMatrix3?(S.boundary=16,S.storage=48):v.isMatrix4?(S.boundary=16,S.storage=64):v.isTexture?Xt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(S.boundary=16,S.storage=v.byteLength):Xt("WebGLRenderer: Unsupported uniform value type.",v),b===!0&&(S.boundary=16,S.storage=Math.ceil(S.storage/16)*16),S}function m(v){const b=v.target;b.removeEventListener("dispose",m),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function g(){for(const v in s)i.deleteBuffer(s[v]);s={},r={}}return{bind:a,update:o,dispose:g}}const Ax=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Dn=null;function Rx(){return Dn===null&&(Dn=new Eh(Ax,16,16,Ri,kn),Dn.name="DFG_LUT",Dn.minFilter=un,Dn.magFilter=un,Dn.wrapS=Jn,Dn.wrapT=Jn,Dn.generateMipmaps=!1,Dn.needsUpdate=!0),Dn}class Cx{constructor(t={}){const{canvas:e=Qu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:d=xn}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const _=d,m=new Set([qo,Xo,Wo]),g=new Set([xn,Gn,Fs,as,ko,Ho]),v=new Uint32Array(4),b=new Int32Array(4),S={textures:[],min:[],max:[],resolution:[]};let T=null,w=null;const x=[],M=[];let C=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Kn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const A=this;let I=!1,N=null,F=null,L=null,z=null;this._outputColorSpace=ln;let X=0,G=0,it=null,q=-1,tt=null;const nt=new Pe,Tt=new Pe;let Gt=null;const Z=new Jt(0);let vt=0,At=e.width,Ft=e.height,Mt=1,Bt=null,Te=null;const Ht=new Pe(0,0,At,Ft),ee=new Pe(0,0,At,Ft);let se=!1;const et=new zs,ut=new Qo;let lt=!1,wt=!1;const _t=new _e,Kt=new P,It=new Pe,re={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ae=!1;function de(){return it===null?Mt:1}let O=n;function Ue(E,U){return e.getContext(E,U)}let ie,ye,mt,De,zt,qt,R,y,H,st,j,ct,gt,$,J,ft,D,Q,Y,dt,ot,ht,Dt;try{const E={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Bo}`),e.addEventListener("webglcontextlost",Ot,!1),e.addEventListener("webglcontextrestored",Qt,!1),e.addEventListener("webglcontextcreationerror",St,!1),O===null){const U="webgl2";if(O=Ue(U,E),O===null)throw Ue(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}jt()}catch(E){throw e.removeEventListener("webglcontextlost",Ot,!1),e.removeEventListener("webglcontextrestored",Qt,!1),e.removeEventListener("webglcontextcreationerror",St,!1),fe("WebGLRenderer: "+E.message),E}function jt(){ie=new I0(O),ie.init(),ot=new vx(O,ie),ye=new S0(O,ie,t,ot),mt=new xx(O,ie),ye.reversedDepthBuffer&&f&&mt.buffers.depth.setReversed(!0),F=O.createFramebuffer(),L=O.createFramebuffer(),z=O.createFramebuffer(),De=new U0(O),zt=new ix,qt=new _x(O,ie,mt,zt,ye,ot,De),R=new L0(A),y=new Fd(O),ht=new v0(O,y),H=new D0(O,y,De,ht),st=new F0(O,H,y,ht,De),Q=new O0(O,ye,qt),J=new y0(zt),j=new nx(A,R,ie,ye,ht,J),ct=new wx(A,zt),gt=new rx,$=new ux(ie),D=new _0(A,R,mt,st,p,l),ft=new gx(A,st,ye),Dt=new Tx(O,De,ye,mt),Y=new M0(O,ie,De),dt=new N0(O,ie,De),De.programs=j.programs,A.capabilities=ye,A.extensions=ie,A.properties=zt,A.renderLists=gt,A.shadowMap=ft,A.state=mt,A.info=De}_!==xn&&(C=new z0(_,e.width,e.height,o,s,r));const rt=new Ex(A,O);this.xr=rt,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const E=ie.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=ie.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return Mt},this.setPixelRatio=function(E){E!==void 0&&(Mt=E,this.setSize(At,Ft,!1))},this.getSize=function(E){return E.set(At,Ft)},this.setSize=function(E,U,W=!0){if(rt.isPresenting){Xt("WebGLRenderer: Can't change size while VR device is presenting.");return}At=E,Ft=U,e.width=Math.floor(E*Mt),e.height=Math.floor(U*Mt),W===!0&&(e.style.width=E+"px",e.style.height=U+"px"),C!==null&&C.setSize(e.width,e.height),this.setViewport(0,0,E,U)},this.getDrawingBufferSize=function(E){return E.set(At*Mt,Ft*Mt).floor()},this.setDrawingBufferSize=function(E,U,W){At=E,Ft=U,Mt=W,e.width=Math.floor(E*W),e.height=Math.floor(U*W),this.setViewport(0,0,E,U)},this.setEffects=function(E){if(_===xn){fe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let U=0;U<E.length;U++)if(E[U].isOutputPass===!0){Xt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(nt)},this.getViewport=function(E){return E.copy(Ht)},this.setViewport=function(E,U,W,k){E.isVector4?Ht.set(E.x,E.y,E.z,E.w):Ht.set(E,U,W,k),mt.viewport(nt.copy(Ht).multiplyScalar(de()).round())},this.getScissor=function(E){return E.copy(ee)},this.setScissor=function(E,U,W,k){E.isVector4?ee.set(E.x,E.y,E.z,E.w):ee.set(E,U,W,k),mt.scissor(Tt.copy(ee).multiplyScalar(de()).round())},this.getScissorTest=function(){return se},this.setScissorTest=function(E){mt.setScissorTest(se=E)},this.setOpaqueSort=function(E){Bt=E},this.setTransparentSort=function(E){Te=E},this.getClearColor=function(E){return E.copy(D.getClearColor())},this.setClearColor=function(){D.setClearColor(...arguments)},this.getClearAlpha=function(){return D.getClearAlpha()},this.setClearAlpha=function(){D.setClearAlpha(...arguments)},this.clear=function(E=!0,U=!0,W=!0){let k=0;if(E){let V=!1;if(it!==null){const xt=it.texture.format;V=m.has(xt)}if(V){const xt=it.texture.type,Rt=g.has(xt),pt=D.getClearColor(),Et=D.getClearAlpha(),Lt=pt.r,$t=pt.g,oe=pt.b;Rt?(v[0]=Lt,v[1]=$t,v[2]=oe,v[3]=Et,O.clearBufferuiv(O.COLOR,0,v)):(b[0]=Lt,b[1]=$t,b[2]=oe,b[3]=Et,O.clearBufferiv(O.COLOR,0,b))}else k|=O.COLOR_BUFFER_BIT}U&&(k|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),W&&(k|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&O.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),N=E},this.dispose=function(){e.removeEventListener("webglcontextlost",Ot,!1),e.removeEventListener("webglcontextrestored",Qt,!1),e.removeEventListener("webglcontextcreationerror",St,!1),D.dispose(),gt.dispose(),$.dispose(),qt.dispose(),zt.dispose(),R.dispose(),st.dispose(),H.dispose(),ht.dispose(),Dt.dispose(),j.dispose(),rt.dispose(),rt.removeEventListener("sessionstart",xl),rt.removeEventListener("sessionend",_l),vi.stop()};function Ot(E){E.preventDefault(),Vr("WebGLRenderer: Context Lost."),I=!0}function Qt(){Vr("WebGLRenderer: Context Restored."),I=!1;const E=De.autoReset,U=ft.enabled,W=ft.autoUpdate,k=ft.needsUpdate,V=ft.type;jt(),De.autoReset=E,ft.enabled=U,ft.autoUpdate=W,ft.needsUpdate=k,ft.type=V}function St(E){fe("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Me(E){const U=E.target;U.removeEventListener("dispose",Me),Ve(U)}function Ve(E){ri(E),zt.remove(E)}function ri(E){const U=zt.get(E).programs;U!==void 0&&(U.forEach(function(W){j.releaseProgram(W)}),E.isShaderMaterial&&j.releaseShaderCache(E))}this.renderBufferDirect=function(E,U,W,k,V,xt){U===null&&(U=re);const Rt=V.isMesh&&V.matrixWorld.determinantAffine()<0,pt=gu(E,U,W,k,V);mt.setMaterial(k,Rt);let Et=W.index,Lt=1;if(k.wireframe===!0){if(Et=H.getWireframeAttribute(W),Et===void 0)return;Lt=2}const $t=W.drawRange,oe=W.attributes.position;let Ct=$t.start*Lt,le=($t.start+$t.count)*Lt;xt!==null&&(Ct=Math.max(Ct,xt.start*Lt),le=Math.min(le,(xt.start+xt.count)*Lt)),Et!==null?(Ct=Math.max(Ct,0),le=Math.min(le,Et.count)):oe!=null&&(Ct=Math.max(Ct,0),le=Math.min(le,oe.count));const Oe=le-Ct;if(Oe<0||Oe===1/0)return;ht.setup(V,k,pt,W,Et);let we,Ee=Y;if(Et!==null&&(we=y.get(Et),Ee=dt,Ee.setIndex(we)),V.isMesh)k.wireframe===!0?(mt.setLineWidth(k.wireframeLinewidth*de()),Ee.setMode(O.LINES)):Ee.setMode(O.TRIANGLES);else if(V.isLine){let Je=k.linewidth;Je===void 0&&(Je=1),mt.setLineWidth(Je*de()),V.isLineSegments?Ee.setMode(O.LINES):V.isLineLoop?Ee.setMode(O.LINE_LOOP):Ee.setMode(O.LINE_STRIP)}else V.isPoints?Ee.setMode(O.POINTS):V.isSprite&&Ee.setMode(O.TRIANGLES);if(V.isBatchedMesh)if(ie.get("WEBGL_multi_draw"))Ee.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const Je=V._multiDrawStarts,Pt=V._multiDrawCounts,sn=V._multiDrawCount,pe=Et?y.get(Et).bytesPerElement:1,Mi=zt.get(k).currentProgram.getUniforms();for(let Ke=0;Ke<sn;Ke++)Mi.setValue(O,"_gl_DrawID",Ke),Ee.render(Je[Ke]/pe,Pt[Ke])}else if(V.isInstancedMesh)Ee.renderInstances(Ct,Oe,V.count);else if(W.isInstancedBufferGeometry){const Je=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Pt=Math.min(W.instanceCount,Je);Ee.renderInstances(Ct,Oe,Pt)}else Ee.render(Ct,Oe)};function gl(E,U,W,k){N!==null&&E.isNodeMaterial&&N.setObject(k,E),lt===!0&&J.setState(E,W,!1),E.transparent===!0&&E.side===qe&&E.forceSinglePass===!1?(E.side=cn,E.needsUpdate=!0,ps(E,U,k),E.side=Ai,E.needsUpdate=!0,ps(E,U,k),E.side=qe):ps(E,U,k)}this.compile=function(E,U,W=null){W===null&&(W=E),N!==null&&N.renderStart(E,U,W),w=$.get(W),w.init(U),M.push(w),W.traverseVisible(function(V){V.isLight&&V.layers.test(U.layers)&&(w.pushLight(V),V.castShadow&&w.pushShadow(V))}),E!==W&&E.traverseVisible(function(V){V.isLight&&V.layers.test(U.layers)&&(w.pushLight(V),V.castShadow&&w.pushShadow(V))}),w.setupLights(),N!==null&&N.updateLights(w.state.lightsArray),wt=this.localClippingEnabled,lt=J.init(this.clippingPlanes,wt),lt===!0&&J.setGlobalState(this.clippingPlanes,U),N!==null&&ft.render(w.state.shadowsArray,W,U);const k=new Set;return E.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const xt=V.material;if(xt)if(Array.isArray(xt))for(let Rt=0;Rt<xt.length;Rt++){const pt=xt[Rt];gl(pt,W,U,V),k.add(pt)}else gl(xt,W,U,V),k.add(xt)}),w=M.pop(),N!==null&&N.renderEnd(),k},this.compileAsync=function(E,U,W=null){const k=this.compile(E,U,W);return new Promise(V=>{function xt(){if(k.forEach(function(Rt){const Et=zt.get(Rt).currentProgram;(Et===void 0||Et.isReady())&&k.delete(Rt)}),k.size===0){V(E);return}setTimeout(xt,10)}ie.get("KHR_parallel_shader_compile")!==null?xt():setTimeout(xt,10)})};let aa=null;function pu(E){aa&&aa(E)}function xl(){vi.stop()}function _l(){vi.start()}const vi=new Gh;vi.setAnimationLoop(pu),typeof self<"u"&&vi.setContext(self),this.setAnimationLoop=function(E){aa=E,rt.setAnimationLoop(E),E===null?vi.stop():vi.start()},rt.addEventListener("sessionstart",xl),rt.addEventListener("sessionend",_l),this.render=function(E,U){if(U!==void 0&&U.isCamera!==!0){fe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;N!==null&&N.renderStart(E,U);const W=rt.enabled===!0&&rt.isPresenting===!0,k=C!==null&&(it===null||W)&&C.begin(A,it);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),rt.enabled===!0&&rt.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(rt.cameraAutoUpdate===!0&&rt.updateCamera(U),U=rt.getCamera()),E.isScene===!0&&E.onBeforeRender(A,E,U,it),w=$.get(E,M.length),w.init(U),w.state.textureUnits=qt.getTextureUnits(),M.push(w),_t.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),U.isArrayCamera?ut.setFromArrayCamera(U):et.setFromProjectionMatrix(_t,Cn,U.reversedDepth),wt=this.localClippingEnabled,lt=J.init(this.clippingPlanes,wt),T=gt.get(E,x.length),T.init(),x.push(T),this.info.render.frame++,rt.enabled===!0&&rt.isPresenting===!0){const Rt=A.xr.getDepthSensingMesh();Rt!==null&&oa(Rt,U,-1/0,A.sortObjects)}oa(E,U,0,A.sortObjects),T.finish(),N!==null&&N.updateLights(w.state.lightsArray),A.sortObjects===!0&&T.sort(Bt,Te),ae=rt.enabled===!1||rt.isPresenting===!1||rt.hasDepthSensing()===!1,ae&&D.addToRenderList(T,E),this.info.autoReset===!0&&this.info.reset(),lt===!0&&J.beginShadows();const V=w.state.shadowsArray;if(ft.render(V,E,U),lt===!0&&J.endShadows(),(k&&C.hasRenderPass())===!1){const Rt=T.opaque,pt=T.transmissive;if(w.setupLights(),U.isArrayCamera){const Et=U.cameras;if(pt.length>0)for(let Lt=0,$t=Et.length;Lt<$t;Lt++){const oe=Et[Lt];Ml(Rt,pt,E,oe)}ae&&D.render(E);for(let Lt=0,$t=Et.length;Lt<$t;Lt++){const oe=Et[Lt];vl(T,E,oe,oe.viewport)}}else pt.length>0&&Ml(Rt,pt,E,U),ae&&D.render(E),vl(T,E,U)}it!==null&&G===0&&(qt.updateMultisampleRenderTarget(it),qt.updateRenderTargetMipmap(it)),k&&C.end(A),E.isScene===!0&&E.onAfterRender(A,E,U),ht.resetDefaultState(),q=-1,tt=null,M.pop(),M.length>0?(w=M[M.length-1],qt.setTextureUnits(w.state.textureUnits),lt===!0&&J.setGlobalState(A.clippingPlanes,w.state.camera)):w=null,x.pop(),x.length>0?T=x[x.length-1]:T=null,N!==null&&N.renderEnd()};function oa(E,U,W,k){if(E.visible===!1)return;if(E.layers.test(U.layers)){if(E.isGroup)W=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(U);else if(E.isLight)w.pushLight(E),E.castShadow&&w.pushShadow(E);else if(E.isSprite){const Rt=U.isArrayCamera?ut:et;if(!E.frustumCulled||E.intersectsFrustum(Rt)){k&&It.setFromMatrixPosition(E.matrixWorld).applyMatrix4(_t);const pt=st.update(E),Et=E.material;Et.visible&&T.push(E,pt,Et,W,It.z,null,U)}}else if(E.isMesh||E.isLine||E.isPoints){const Rt=U.isArrayCamera?ut:et;if(!E.frustumCulled||E.intersectsFrustum(Rt)){const pt=st.update(E),Et=E.material;if(k&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),It.copy(E.boundingSphere.center)):(pt.boundingSphere===null&&pt.computeBoundingSphere(),It.copy(pt.boundingSphere.center)),It.applyMatrix4(E.matrixWorld).applyMatrix4(_t)),Array.isArray(Et)){const Lt=pt.groups;for(let $t=0,oe=Lt.length;$t<oe;$t++){const Ct=Lt[$t],le=Et[Ct.materialIndex];le&&le.visible&&T.push(E,pt,le,W,It.z,Ct,U)}}else Et.visible&&T.push(E,pt,Et,W,It.z,null,U)}}}const xt=E.children;for(let Rt=0,pt=xt.length;Rt<pt;Rt++)oa(xt[Rt],U,W,k)}function vl(E,U,W,k){const{opaque:V,transmissive:xt,transparent:Rt}=E;w.setupLightsView(W),lt===!0&&J.setGlobalState(A.clippingPlanes,W),k&&mt.viewport(nt.copy(k)),V.length>0&&Js(V,U,W),xt.length>0&&Js(xt,U,W),Rt.length>0&&Js(Rt,U,W),mt.buffers.depth.setTest(!0),mt.buffers.depth.setMask(!0),mt.buffers.color.setMask(!0),mt.setPolygonOffset(!1)}function Ml(E,U,W,k){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[k.id]===void 0){const Ct=ie.has("EXT_color_buffer_half_float")||ie.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[k.id]=new Fn(1,1,{generateMipmaps:!0,type:Ct?kn:xn,minFilter:pi,samples:Math.max(4,ye.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ce.workingColorSpace})}const xt=w.state.transmissionRenderTarget[k.id],Rt=k.viewport||nt;xt.setSize(Rt.z*A.transmissionResolutionScale,Rt.w*A.transmissionResolutionScale);const pt=A.getRenderTarget(),Et=A.getActiveCubeFace(),Lt=A.getActiveMipmapLevel();A.setRenderTarget(xt),A.getClearColor(Z),vt=A.getClearAlpha(),vt<1&&A.setClearColor(16777215,.5),A.clear(),ae&&D.render(W);const $t=A.toneMapping;A.toneMapping=Kn;const oe=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),w.setupLightsView(k),lt===!0&&J.setGlobalState(A.clippingPlanes,k),Js(E,W,k),qt.updateMultisampleRenderTarget(xt),qt.updateRenderTargetMipmap(xt),ie.has("WEBGL_multisampled_render_to_texture")===!1){let Ct=!1;for(let le=0,Oe=U.length;le<Oe;le++){const we=U[le],{object:Ee,geometry:Je,material:Pt,group:sn}=we;if(Pt.side===qe&&Ee.layers.test(k.layers)){const pe=Pt.side;Pt.side=cn,Pt.needsUpdate=!0,Sl(Ee,W,k,Je,Pt,sn),Pt.side=pe,Pt.needsUpdate=!0,Ct=!0}}Ct===!0&&(qt.updateMultisampleRenderTarget(xt),qt.updateRenderTargetMipmap(xt))}A.setRenderTarget(pt,Et,Lt),A.setClearColor(Z,vt),oe!==void 0&&(k.viewport=oe),A.toneMapping=$t}function Js(E,U,W){const k=U.isScene===!0?U.overrideMaterial:null;for(let V=0,xt=E.length;V<xt;V++){const Rt=E[V],{object:pt,geometry:Et,group:Lt}=Rt;let $t=Rt.material;$t.allowOverride===!0&&k!==null&&($t=k),pt.layers.test(W.layers)&&Sl(pt,U,W,Et,$t,Lt)}}function Sl(E,U,W,k,V,xt){N!==null&&V.isNodeMaterial&&N.setObject(E,V),E.onBeforeRender(A,U,W,k,V,xt),E.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),V.onBeforeRender(A,U,W,k,E,xt),V.transparent===!0&&V.side===qe&&V.forceSinglePass===!1?(V.side=cn,V.needsUpdate=!0,A.renderBufferDirect(W,U,k,V,E,xt),V.side=Ai,V.needsUpdate=!0,A.renderBufferDirect(W,U,k,V,E,xt),V.side=qe):A.renderBufferDirect(W,U,k,V,E,xt),E.onAfterRender(A,U,W,k,V,xt)}function yl(E){let U=0;for(const W of E)W.texture!==null&&U++;return U}function ps(E,U,W){U.isScene!==!0&&(U=re);const k=zt.get(E),V=w.state.lights,xt=w.state.shadowsArray,Rt=V.state.version,pt=j.getParameters(E,V.state,xt,U,W,w.state.lightProbeGridArray),Et=j.getProgramCacheKey(pt);let Lt=k.programs;k.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?U.environment:null,k.fog=U.fog;const $t=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;k.envMap=R.get(E.envMap||k.environment,$t),k.envMapRotation=k.environment!==null&&E.envMap===null?U.environmentRotation:E.envMapRotation,Lt===void 0&&(E.addEventListener("dispose",Me),Lt=new Map,k.programs=Lt,k.programVariants=new Map);let oe=Lt.get(Et);if(oe!==void 0){if(k.currentProgram===oe&&k.lightsStateVersion===Rt)return bl(E,pt),oe}else pt.uniforms=j.getUniforms(E),N!==null&&E.isNodeMaterial&&N.build(E,W,pt),E.onBeforeCompile(pt,A),oe=j.acquireProgram(pt,Et),Lt.set(Et,oe),k.uniforms=pt.uniforms;const Ct=k.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ct.clippingPlanes=J.uniform),bl(E,pt),k.needsLights=_u(E),k.lightsStateVersion=Rt,k.needsLights&&(Ct.ambientLightColor.value=V.state.ambient,Ct.lightProbe.value=V.state.probe,Ct.sunLights.value=V.state.sun,Ct.sunLightShadows.value=V.state.sunShadow,Ct.directionalLights.value=V.state.directional,Ct.directionalLightShadows.value=V.state.directionalShadow,Ct.spotLights.value=V.state.spot,Ct.spotLightShadows.value=V.state.spotShadow,Ct.rectAreaLights.value=V.state.rectArea,Ct.ltc_1.value=V.state.rectAreaLTC1,Ct.ltc_2.value=V.state.rectAreaLTC2,Ct.pointLights.value=V.state.point,Ct.pointLightShadows.value=V.state.pointShadow,Ct.hemisphereLights.value=V.state.hemi,Ct.sunShadowMatrix.value=V.state.sunShadowMatrix,Ct.sunShadowCascade.value=V.state.sunShadowCascade,Ct.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Ct.spotLightMatrix.value=V.state.spotLightMatrix,Ct.spotLightMap.value=V.state.spotLightMap,Ct.pointShadowMatrix.value=V.state.pointShadowMatrix),k.numLightProbeGrids=yl(w.state.lightProbeGridArray),k.currentProgram=oe,k.uniformsList=null,oe}function mu(E,U,W,k,V){const xt=zt.get(E),Rt=xt.currentProgram.id+","+k+","+V;let pt=xt.programVariants.get(Rt);return pt===void 0?(pt=ps(E,U,W),xt.programVariants.set(Rt,pt)):(xt.currentProgram=pt,xt.uniformsList=null,xt.outputColorSpace=k,xt.toneMapping=V),pt}function El(E){if(E.uniformsList===null){const U=E.currentProgram.getUniforms();E.uniformsList=Fr.seqWithValue(U.seq,E.uniforms)}return E.uniformsList}function bl(E,U){const W=zt.get(E);W.outputColorSpace=U.outputColorSpace,W.batching=U.batching,W.batchingColor=U.batchingColor,W.instancing=U.instancing,W.instancingColor=U.instancingColor,W.instancingMorph=U.instancingMorph,W.skinning=U.skinning,W.morphTargets=U.morphTargets,W.morphNormals=U.morphNormals,W.morphColors=U.morphColors,W.morphTargetsCount=U.morphTargetsCount,W.numClippingPlanes=U.numClippingPlanes,W.numIntersection=U.numClipIntersection,W.vertexAlphas=U.vertexAlphas,W.vertexTangents=U.vertexTangents,W.toneMapping=U.toneMapping}function gu(E,U,W,k,V){U.isScene!==!0&&(U=re),qt.resetTextureUnits();const xt=U.fog,Rt=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?U.environment:null,pt=it===null?A.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:ce.workingColorSpace,Et=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,Lt=R.get(k.envMap||Rt,Et),$t=k.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,oe=!!W.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Ct=!!W.morphAttributes.position,le=!!W.morphAttributes.normal,Oe=!!W.morphAttributes.color;let we=Kn;k.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(we=A.toneMapping);const Ee=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Je=Ee!==void 0?Ee.length:0,Pt=zt.get(k),sn=w.state.lights;if(lt===!0&&(wt===!0||E!==tt)){const Ce=E===tt&&k.id===q;J.setState(k,E,Ce)}let pe=!1,Mi=!1;k.version===Pt.__version?Pt.needsLights&&Pt.lightsStateVersion!==sn.state.version||V.isBatchedMesh&&Pt.batching===!1||!V.isBatchedMesh&&Pt.batching===!0||V.isBatchedMesh&&Pt.batchingColor===!0&&V._colorsTexture===null||V.isBatchedMesh&&Pt.batchingColor===!1&&V._colorsTexture!==null||V.isInstancedMesh&&Pt.instancing===!1||!V.isInstancedMesh&&Pt.instancing===!0||V.isSkinnedMesh&&Pt.skinning===!1||!V.isSkinnedMesh&&Pt.skinning===!0||V.isInstancedMesh&&Pt.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Pt.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Pt.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Pt.instancingMorph===!1&&V.morphTexture!==null||Pt.envMap!==Lt||k.fog===!0&&Pt.fog!==xt||Pt.numClippingPlanes!==void 0&&(Pt.numClippingPlanes!==J.numPlanes||Pt.numIntersection!==J.numIntersection)||Pt.vertexAlphas!==$t||Pt.vertexTangents!==oe||Pt.morphTargets!==Ct||Pt.morphNormals!==le||Pt.morphColors!==Oe||Pt.morphTargetsCount!==Je||Pt.numLightProbeGrids!==yl(w.state.lightProbeGridArray)?pe=!0:(Pt.outputColorSpace!==pt||Pt.toneMapping!==we)&&(Mi=!0):(pe=!0,Pt.__version=k.version);let Ke=Pt.currentProgram;(pe===!0||Mi===!0)&&(Ke=Mi===!0?mu(k,U,V,pt,we):ps(k,U,V),N&&k.isNodeMaterial&&N.onUpdateProgram(k,Ke,Pt));let Ks=!1,ai=!1,Si=!1;const ue=Ke.getUniforms(),Ye=Pt.uniforms;if(mt.useProgram(Ke.program)&&(Ks=!0,ai=!0,Si=!0),k.id!==q&&(q=k.id,ai=!0),Ks||tt!==E){mt.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),ue.setValue(O,"projectionMatrix",E.projectionMatrix),ue.setValue(O,"viewMatrix",E.matrixWorldInverse);const We=ue.map.cameraPosition;We!==void 0&&We.setValue(O,Kt.setFromMatrixPosition(E.matrixWorld)),ye.logarithmicDepthBuffer&&ue.setValue(O,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&ue.setValue(O,"isOrthographic",E.isOrthographicCamera===!0),tt!==E&&(tt=E,ai=!0,Si=!0)}if(Pt.needsLights&&(sn.state.sunShadowMap.length>0&&ue.setValue(O,"sunShadowMap",sn.state.sunShadowMap,qt),sn.state.directionalShadowMap.length>0&&ue.setValue(O,"directionalShadowMap",sn.state.directionalShadowMap,qt),sn.state.spotShadowMap.length>0&&ue.setValue(O,"spotShadowMap",sn.state.spotShadowMap,qt),sn.state.pointShadowMap.length>0&&ue.setValue(O,"pointShadowMap",sn.state.pointShadowMap,qt)),V.isSkinnedMesh){ue.setOptional(O,V,"bindMatrix"),ue.setOptional(O,V,"bindMatrixInverse");const Ce=V.skeleton;Ce&&(Ce.boneTexture===null&&Ce.computeBoneTexture(),ue.setValue(O,"boneTexture",Ce.boneTexture,qt))}V.isBatchedMesh&&(ue.setOptional(O,V,"batchingTexture"),ue.setValue(O,"batchingTexture",V._matricesTexture,qt),ue.setOptional(O,V,"batchingIdTexture"),ue.setValue(O,"batchingIdTexture",V._indirectTexture,qt),ue.setOptional(O,V,"batchingColorTexture"),V._colorsTexture!==null&&ue.setValue(O,"batchingColorTexture",V._colorsTexture,qt));const yn=W.morphAttributes;if((yn.position!==void 0||yn.normal!==void 0||yn.color!==void 0)&&Q.update(V,W,Ke),(ai||Pt.receiveShadow!==V.receiveShadow)&&(Pt.receiveShadow=V.receiveShadow,ue.setValue(O,"receiveShadow",V.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&U.environment!==null&&(Ye.envMapIntensity.value=U.environmentIntensity),Ye.dfgLUT!==void 0&&(Ye.dfgLUT.value=Rx()),ai){if(ue.setValue(O,"toneMappingExposure",A.toneMappingExposure),Pt.needsLights&&xu(Ye,Si),xt&&k.fog===!0&&ct.refreshFogUniforms(Ye,xt),ct.refreshMaterialUniforms(Ye,k,Mt,Ft,w.state.transmissionRenderTarget[E.id]),Pt.needsLights&&Pt.numLightProbeGrids>0){const Ce=S;let We=0;for(const Wn of w.state.lightProbeGridArray)Wn.texture!==null&&(Ce.textures[We]=Wn.texture,Ce.min[We]=Wn.boundingBox.min,Ce.max[We]=Wn.boundingBox.max,Ce.resolution[We]=Wn.resolution,We++);for(const Wn in Ce)Ce[Wn].length=We;Ye.probesSH.value=Ce.textures,Ye.probesMin.value=Ce.min,Ye.probesMax.value=Ce.max,Ye.probesResolution.value=Ce.resolution}Fr.upload(O,El(Pt),Ye,qt)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(Fr.upload(O,El(Pt),Ye,qt),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&ue.setValue(O,"center",V.center),ue.setValue(O,"modelViewMatrix",V.modelViewMatrix),ue.setValue(O,"normalMatrix",V.normalMatrix),ue.setValue(O,"modelMatrix",V.matrixWorld),k.uniformsGroups!==void 0){const Ce=k.uniformsGroups;for(let We=0,Wn=Ce.length;We<Wn;We++){const Tl=Ce[We];Dt.update(Tl,Ke),Dt.bind(Tl,Ke)}}return Ke}function xu(E,U){E.ambientLightColor.needsUpdate=U,E.lightProbe.needsUpdate=U,E.sunLights.needsUpdate=U,E.sunLightShadows.needsUpdate=U,E.directionalLights.needsUpdate=U,E.directionalLightShadows.needsUpdate=U,E.pointLights.needsUpdate=U,E.pointLightShadows.needsUpdate=U,E.spotLights.needsUpdate=U,E.spotLightShadows.needsUpdate=U,E.rectAreaLights.needsUpdate=U,E.hemisphereLights.needsUpdate=U}function _u(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return it},this.setRenderTargetTextures=function(E,U,W){const k=zt.get(E);k.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),zt.get(E.texture).__webglTexture=U,zt.get(E.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:W,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,U){const W=zt.get(E);W.__webglFramebuffer=U,W.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(E,U=0,W=0){it=E,X=U,G=W;let k=null,V=!1,xt=!1;if(E){const pt=zt.get(E);if(pt.__useDefaultFramebuffer!==void 0){mt.bindFramebuffer(O.FRAMEBUFFER,pt.__webglFramebuffer),nt.copy(E.viewport),Tt.copy(E.scissor),Gt=E.scissorTest,mt.viewport(nt),mt.scissor(Tt),mt.setScissorTest(Gt),q=-1;return}else if(pt.__webglFramebuffer===void 0)qt.setupRenderTarget(E);else if(pt.__hasExternalTextures)qt.rebindTextures(E,zt.get(E.texture).__webglTexture,zt.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const $t=E.depthTexture;if(pt.__boundDepthTexture!==$t){if($t!==null&&zt.has($t)&&(E.width!==$t.image.width||E.height!==$t.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");qt.setupDepthRenderbuffer(E)}}const Et=E.texture;(Et.isData3DTexture||Et.isDataArrayTexture||Et.isCompressedArrayTexture)&&(xt=!0);const Lt=zt.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Lt[U])?k=Lt[U][W]:k=Lt[U],V=!0):E.samples>0&&qt.useMultisampledRTT(E)===!1?k=zt.get(E).__webglMultisampledFramebuffer:Array.isArray(Lt)?k=Lt[W]:k=Lt,nt.copy(E.viewport),Tt.copy(E.scissor),Gt=E.scissorTest}else nt.copy(Ht).multiplyScalar(Mt).floor(),Tt.copy(ee).multiplyScalar(Mt).floor(),Gt=se;if(W!==0&&(k=F),mt.bindFramebuffer(O.FRAMEBUFFER,k)&&mt.drawBuffers(E,k),mt.viewport(nt),mt.scissor(Tt),mt.setScissorTest(Gt),V){const pt=zt.get(E.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+U,pt.__webglTexture,W)}else if(xt){const pt=U;for(let Et=0;Et<E.textures.length;Et++){const Lt=zt.get(E.textures[Et]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+Et,Lt.__webglTexture,W,pt)}}else if(E!==null&&W!==0){const pt=zt.get(E.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,pt.__webglTexture,W)}q=-1};function wl(E){const U=zt.get(E);return(U.__readFormat!==E.format||U.__readType!==E.type)&&(U.__readFormat=E.format,U.__readType=E.type,U.__formatReadable=ye.textureFormatReadable(E.format),U.__typeReadable=ye.textureTypeReadable(E.type)),U}this.readRenderTargetPixels=function(E,U,W,k,V,xt,Rt,pt=0){if(!(E&&E.isWebGLRenderTarget)){fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Et=zt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Rt!==void 0&&(Et=Et[Rt],Array.isArray(Et)&&(Et=Et[0])),Et){mt.bindFramebuffer(O.FRAMEBUFFER,Et);try{const Lt=E.textures[pt],$t=Lt.format,oe=Lt.type;E.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+pt);const Ct=wl(Lt);if(Ct.__formatReadable===!1){fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ct.__typeReadable===!1){fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=E.width-k&&W>=0&&W<=E.height-V&&O.readPixels(U,W,k,V,ot.convert($t),ot.convert(oe),xt)}finally{const Lt=it!==null?zt.get(it).__webglFramebuffer:null;mt.bindFramebuffer(O.FRAMEBUFFER,Lt)}}},this.readRenderTargetPixelsAsync=async function(E,U,W,k,V,xt,Rt,pt=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Et=zt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Rt!==void 0&&(Et=Et[Rt],Array.isArray(Et)&&(Et=Et[0])),Et)if(U>=0&&U<=E.width-k&&W>=0&&W<=E.height-V){mt.bindFramebuffer(O.FRAMEBUFFER,Et);const Lt=E.textures[pt],$t=Lt.format,oe=Lt.type;E.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+pt);const Ct=wl(Lt);if(Ct.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ct.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const le=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,le),O.bufferData(O.PIXEL_PACK_BUFFER,xt.byteLength,O.STREAM_READ),O.readPixels(U,W,k,V,ot.convert($t),ot.convert(oe),0),O.bindBuffer(O.PIXEL_PACK_BUFFER,null);const Oe=it!==null?zt.get(it).__webglFramebuffer:null;mt.bindFramebuffer(O.FRAMEBUFFER,Oe);const we=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await ju(O,we,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,le),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,xt),O.bindBuffer(O.PIXEL_PACK_BUFFER,null),O.deleteBuffer(le),O.deleteSync(we),xt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,U=null,W=0){const k=Math.pow(2,-W),V=Math.floor(E.image.width*k),xt=Math.floor(E.image.height*k),Rt=U!==null?U.x:0,pt=U!==null?U.y:0;qt.setTexture2D(E,0),O.copyTexSubImage2D(O.TEXTURE_2D,W,0,0,Rt,pt,V,xt),mt.unbindTexture()},this.copyTextureToTexture=function(E,U,W=null,k=null,V=0,xt=0){let Rt,pt,Et,Lt,$t,oe,Ct,le,Oe;const we=E.isCompressedTexture?E.mipmaps[xt]:E.image;if(W!==null)Rt=W.max.x-W.min.x,pt=W.max.y-W.min.y,Et=W.isBox3?W.max.z-W.min.z:1,Lt=W.min.x,$t=W.min.y,oe=W.isBox3?W.min.z:0;else{const ue=Math.pow(2,-V);Rt=Math.floor(we.width*ue),pt=Math.floor(we.height*ue),E.isDataArrayTexture?Et=we.depth:E.isData3DTexture?Et=Math.floor(we.depth*ue):Et=1,Lt=0,$t=0,oe=0}k!==null?(Ct=k.x,le=k.y,Oe=k.z):(Ct=0,le=0,Oe=0);const Ee=ot.convert(U.format),Je=ot.convert(U.type);let Pt;U.isData3DTexture?(qt.setTexture3D(U,0),Pt=O.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(qt.setTexture2DArray(U,0),Pt=O.TEXTURE_2D_ARRAY):(qt.setTexture2D(U,0),Pt=O.TEXTURE_2D),mt.activeTexture(O.TEXTURE0),mt.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,U.flipY),mt.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),mt.pixelStorei(O.UNPACK_ALIGNMENT,U.unpackAlignment);const sn=mt.getParameter(O.UNPACK_ROW_LENGTH),pe=mt.getParameter(O.UNPACK_IMAGE_HEIGHT),Mi=mt.getParameter(O.UNPACK_SKIP_PIXELS),Ke=mt.getParameter(O.UNPACK_SKIP_ROWS),Ks=mt.getParameter(O.UNPACK_SKIP_IMAGES);mt.pixelStorei(O.UNPACK_ROW_LENGTH,we.width),mt.pixelStorei(O.UNPACK_IMAGE_HEIGHT,we.height),mt.pixelStorei(O.UNPACK_SKIP_PIXELS,Lt),mt.pixelStorei(O.UNPACK_SKIP_ROWS,$t),mt.pixelStorei(O.UNPACK_SKIP_IMAGES,oe);const ai=E.isDataArrayTexture||E.isData3DTexture,Si=U.isDataArrayTexture||U.isData3DTexture;if(E.isDepthTexture){const ue=zt.get(E),Ye=zt.get(U),yn=zt.get(ue.__renderTarget),Ce=zt.get(Ye.__renderTarget);mt.bindFramebuffer(O.READ_FRAMEBUFFER,yn.__webglFramebuffer),mt.bindFramebuffer(O.DRAW_FRAMEBUFFER,Ce.__webglFramebuffer);for(let We=0;We<Et;We++)ai&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,zt.get(E).__webglTexture,V,oe+We),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,zt.get(U).__webglTexture,xt,Oe+We)),O.blitFramebuffer(Lt,$t,Lt+Rt,$t+pt,Ct,le,Ct+Rt,le+pt,O.DEPTH_BUFFER_BIT,O.NEAREST);mt.bindFramebuffer(O.READ_FRAMEBUFFER,null),mt.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(V!==0||E.isRenderTargetTexture||zt.has(E)){const ue=zt.get(E),Ye=zt.get(U);mt.bindFramebuffer(O.READ_FRAMEBUFFER,L),mt.bindFramebuffer(O.DRAW_FRAMEBUFFER,z);for(let yn=0;yn<Et;yn++)ai?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,ue.__webglTexture,V,oe+yn):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,ue.__webglTexture,V),Si?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ye.__webglTexture,xt,Oe+yn):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Ye.__webglTexture,xt),V!==0?O.blitFramebuffer(Lt,$t,Lt+Rt,$t+pt,Ct,le,Ct+Rt,le+pt,O.COLOR_BUFFER_BIT,O.NEAREST):Si?O.copyTexSubImage3D(Pt,xt,Ct,le,Oe+yn,Lt,$t,Rt,pt):O.copyTexSubImage2D(Pt,xt,Ct,le,Lt,$t,Rt,pt);mt.bindFramebuffer(O.READ_FRAMEBUFFER,null),mt.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else Si?E.isDataTexture||E.isData3DTexture?O.texSubImage3D(Pt,xt,Ct,le,Oe,Rt,pt,Et,Ee,Je,we.data):U.isCompressedArrayTexture?O.compressedTexSubImage3D(Pt,xt,Ct,le,Oe,Rt,pt,Et,Ee,we.data):O.texSubImage3D(Pt,xt,Ct,le,Oe,Rt,pt,Et,Ee,Je,we):E.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,xt,Ct,le,Rt,pt,Ee,Je,we.data):E.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,xt,Ct,le,we.width,we.height,Ee,we.data):O.texSubImage2D(O.TEXTURE_2D,xt,Ct,le,Rt,pt,Ee,Je,we);mt.pixelStorei(O.UNPACK_ROW_LENGTH,sn),mt.pixelStorei(O.UNPACK_IMAGE_HEIGHT,pe),mt.pixelStorei(O.UNPACK_SKIP_PIXELS,Mi),mt.pixelStorei(O.UNPACK_SKIP_ROWS,Ke),mt.pixelStorei(O.UNPACK_SKIP_IMAGES,Ks),xt===0&&U.generateMipmaps===!0&&U.mipmapsAutoUpdate===!0&&O.generateMipmap(Pt),mt.unbindTexture()},this.initRenderTarget=function(E){zt.get(E).__webglFramebuffer===void 0&&qt.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?qt.setTextureCube(E,0):E.isData3DTexture?qt.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?qt.setTexture2DArray(E,0):qt.setTexture2D(E,0),mt.unbindTexture()},this.resetState=function(){X=0,G=0,it=null,mt.reset(),ht.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=ce._getDrawingBufferColorSpace(t),e.unpackColorSpace=ce._getUnpackColorSpace()}}function Px(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new He;l.morphTargetsRelative=o;let c=0;for(let h=0;h<i.length;++h){const u=i[h];let f=0,d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const p in u.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(u.attributes[p]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const p in u.morphAttributes){if(!s.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;if(u.morphAttributes[p].length!==i[0].morphAttributes[p].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have the same number of morph targets for the "'+p+'" morph attribute.'),null;a[p]===void 0&&(a[p]=[]),a[p].push(u.morphAttributes[p]),d++}if(d!==s.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of morph attributes."),null;if(t){let p;if(e)p=u.index.count;else if(u.attributes.position!==void 0)p=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,p,h),c+=p}}if(e){let h=0;const u=[];for(let f=0;f<i.length;++f){const d=i[f].index;for(let p=0;p<d.count;++p)u.push(d.getX(p)+h);h+=i[f].attributes.position.count}l.setIndex(u)}for(const h in r){const u=Bc(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in a){const u=a[h][0].length;if(u!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let f=0;f<u;++f){const d=[];for(let _=0;_<a[h].length;++_)d.push(a[h][_][f]);const p=Bc(d);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(p)}}}return l}function Bc(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const a=new t(r),o=new Ln(a,e,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const u=l/e;for(let f=0,d=h.count;f<d;f++)for(let p=0;p<e;p++){const _=h.getComponent(f,p);o.setComponent(f+u,p,_)}}else a.set(h.array,l);l+=h.count*e}return s!==void 0&&(o.gpuType=s),o}const xe=(i,t,e)=>Math.max(t,Math.min(e,i)),Lx=(i,t,e)=>i+(t-i)*e,On=(i,t,e,n)=>Lx(i,t,1-Math.exp(-e*n));function Ix(i){let t=i>>>0;return function(){t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ta(i){const t=Ix(i);return{next:t,range:(e,n)=>e+t()*(n-e),int:(e,n)=>Math.floor(e+t()*(n-e+1)),pick:e=>e[Math.floor(t()*e.length)],chance:e=>t()<e}}function hn(i,t){const e=document.createElement("canvas");e.width=i,e.height=t;const n=e.getContext("2d");return{c:e,ctx:n}}function fn(i,{repeat:t=null,srgb:e=!0}={}){const n=new Th(i);return e&&(n.colorSpace=ln),n.anisotropy=4,t&&(n.wrapS=n.wrapT=rs,n.repeat.set(t[0],t[1])),n}function Dx(){const{c:i,ctx:t}=hn(256,256);t.fillStyle="#20212b",t.fillRect(0,0,256,256);for(let e=0;e<3400;e++){const n=24+Math.random()*45;t.fillStyle=`rgba(${n},${n+2},${n+8},${.15+Math.random()*.4})`;const s=Math.random()*2+.4;t.fillRect(Math.random()*256,Math.random()*256,s,s)}for(let e=0;e<7;e++){t.strokeStyle="rgba(8,8,12,0.24)",t.lineWidth=.8,t.beginPath();let n=Math.random()*256,s=Math.random()*256;t.moveTo(n,s);for(let r=0;r<6;r++)n+=(Math.random()-.5)*26,s+=Math.random()*18,t.lineTo(n,s);t.stroke()}return fn(i,{repeat:[34,34]})}function Nx(){const{c:i,ctx:t}=hn(256,256);t.fillStyle="#b9b0a3",t.fillRect(0,0,256,256);for(let e=0;e<2200;e++){const n=150+Math.random()*70;t.fillStyle=`rgba(${n},${n-5},${n-15},${Math.random()*.35})`,t.fillRect(Math.random()*256,Math.random()*256,1.4,1.4)}t.strokeStyle="rgba(60,55,50,0.28)",t.lineWidth=2;for(let e=0;e<=4;e++){const n=e*64;t.beginPath(),t.moveTo(n,0),t.lineTo(n,256),t.stroke(),t.beginPath(),t.moveTo(0,n),t.lineTo(256,n),t.stroke()}t.strokeStyle="rgba(255,255,255,0.15)",t.lineWidth=1;for(let e=0;e<=4;e++)t.beginPath(),t.moveTo(e*64+2,0),t.lineTo(e*64+2,256),t.stroke();return fn(i,{repeat:[2,2]})}function Ux(){const{c:i,ctx:t}=hn(256,256);t.fillStyle="#d8b98d",t.fillRect(0,0,256,256);for(let e=0;e<5e3;e++){const n=Math.random();t.fillStyle=n>.5?"rgba(120,88,56,0.18)":"rgba(255,245,220,0.22)",t.fillRect(Math.random()*256,Math.random()*256,1.3,1.3)}for(let e=0;e<10;e++)t.strokeStyle="rgba(255,240,215,0.12)",t.beginPath(),t.arc(Math.random()*256,Math.random()*256,20+Math.random()*60,0,Math.PI),t.stroke();return fn(i,{repeat:[10,10]})}function Ox(){const{c:i,ctx:t}=hn(256,256);t.fillStyle="#3f613c",t.fillRect(0,0,256,256);for(let e=0;e<4600;e++){const n=60+Math.random()*70;t.fillStyle=`rgba(${n*.55},${n},${n*.5},${.25+Math.random()*.4})`,t.fillRect(Math.random()*256,Math.random()*256,1.4,2.6)}return fn(i,{repeat:[3,3]})}const zc=[{base:"#d8b6a2",trim:"#f0d8c8",win:"#1d2a3a",lit:"#ffd79a",accent:"#ff7f9f"},{base:"#8fb2b2",trim:"#c8ded8",win:"#132432",lit:"#a9ecff",accent:"#47e7d4"},{base:"#c6aecb",trim:"#e6d5e8",win:"#1b2036",lit:"#ffb8e2",accent:"#ff62b0"},{base:"#b9bcc4",trim:"#dde0e5",win:"#151d2b",lit:"#bcd4ff",accent:"#7a9dff"},{base:"#d6c6a4",trim:"#efe4c9",win:"#202432",lit:"#ffe1a1",accent:"#ffbf4d"},{base:"#8f9b90",trim:"#c6d0c4",win:"#16222a",lit:"#c5ffd0",accent:"#6dffa6"}];function Fx(i=0,t=1){const e=zc[i%zc.length],n=ta(t),s=256,r=512,{c:a,ctx:o}=hn(s,r),{c:l,ctx:c}=hn(s,r);o.fillStyle=e.base,o.fillRect(0,0,s,r),c.fillStyle="#000",c.fillRect(0,0,s,r);for(let m=0;m<1600;m++)o.fillStyle=`rgba(255,255,255,${Math.random()*.05})`,o.fillRect(Math.random()*s,Math.random()*r,2,2);const h=7,u=16,f=16,d=16,p=(s-f*2)/h,_=(r-d*2)/u;for(let m=0;m<u;m++){for(let g=0;g<h;g++){const v=f+g*p+3,b=d+m*_+4,S=p-7,T=_-9;if(o.fillStyle=e.win,o.fillRect(v,b,S,T),n.chance(.34)){const x=o.createLinearGradient(v,b,v,b+T);x.addColorStop(0,e.lit),x.addColorStop(1,e.win),o.fillStyle=x,o.globalAlpha=.55+n.next()*.35,o.fillRect(v,b,S,T),o.globalAlpha=1,c.fillStyle=e.lit,c.globalAlpha=.5+n.next()*.5,c.fillRect(v,b,S,T),c.globalAlpha=1}o.strokeStyle="rgba(255,255,255,0.10)",o.lineWidth=1,o.strokeRect(v+.5,b+.5,S,T)}m%4===3&&(o.fillStyle=e.trim,o.fillRect(0,d+(m+1)*_-3,s,5))}return o.fillStyle=e.trim,o.fillRect(0,0,s,10),o.fillRect(0,r-14,s,14),o.fillStyle=e.accent,o.globalAlpha=.55,o.fillRect(s-5,0,3,r),o.globalAlpha=1,{map:fn(a),emissiveMap:fn(l),accent:e.accent}}function ii(i="rgba(255,255,255,1)",t="rgba(255,255,255,0)"){const{c:e,ctx:n}=hn(128,128),s=n.createRadialGradient(64,64,0,64,64,64);return s.addColorStop(0,i),s.addColorStop(.25,i),s.addColorStop(.6,t.replace(/[\d.]+\)$/,"0.25)")),s.addColorStop(1,t),n.fillStyle=s,n.fillRect(0,0,128,128),fn(e)}function Bx(){const{c:i,ctx:t}=hn(128,128),e=t.createRadialGradient(64,64,8,64,64,62);return e.addColorStop(0,"rgba(0,0,0,0.55)"),e.addColorStop(.55,"rgba(0,0,0,0.3)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),fn(i)}function zx(i,t,e="#66f4ff"){const{c:n,ctx:s}=hn(512,128);return s.clearRect(0,0,512,128),s.textAlign="center",s.fillStyle="rgba(5,6,12,0.7)",s.beginPath(),s.roundRect(66,16,380,92,6),s.fill(),s.strokeStyle="rgba(255,255,255,0.18)",s.lineWidth=2,s.stroke(),s.fillStyle=e,s.fillRect(82,40,4,44),s.font='900 40px "Arial Black", Arial, sans-serif',s.fillStyle="#ffffff",s.fillText(i,270,62),s.font="800 15px Arial, sans-serif",s.fillStyle="rgba(255,255,255,0.55)",s.letterSpacing="2px",s.fillText(t,270,90),fn(n)}function Gx(i,{color:t="#ff4f9a",bg:e="rgba(8,8,18,0.9)",sub:n="",w:s=1024,h:r=256,font:a=900,align:o="center"}={}){const{c:l,ctx:c}=hn(s,r);c.fillStyle=e,c.fillRect(0,0,s,r),c.strokeStyle=t,c.lineWidth=5,c.strokeRect(12,12,s-24,r-24),c.textAlign=o,c.textBaseline="middle";const h=o==="center"?s/2:36;return c.font=`${a} ${n?r*.42:r*.5}px "Arial Black", Arial, sans-serif`,c.shadowColor=t,c.shadowBlur=28,c.fillStyle="#fff",c.fillText(i,h,n?r*.42:r*.5),c.shadowBlur=14,c.fillStyle=t,c.globalAlpha=.55,c.fillText(i,h,n?r*.4:r*.48),c.globalAlpha=1,n&&(c.shadowBlur=0,c.font="800 26px Arial, sans-serif",c.fillStyle=t,c.fillText(n,h,r*.78)),fn(l)}function An(i,t,e,n,s,r=.9){const a=new ti({map:t,color:e,transparent:!0,opacity:r,blending:zn,depthWrite:!1,toneMapped:!1}),o=new _i(a);return o.scale.set(n,n,1),o.position.copy(s),i.add(o),o}function Kh(i,t=4,e=1,n=.04){const s=new Ze(t,t),r=new he({map:kx(),transparent:!0,opacity:e,depthWrite:!1,toneMapped:!1}),a=new K(s,r);return a.rotation.x=-Math.PI/2,a.position.y=n,a.renderOrder=2,i.add(a),a}let Ba=null;function kx(){return Ba||(Ba=Bx()),Ba}const Wt={n:5,blockSize:48,road:16,pitch:64,min:-168,max:168};Wt.roadCenters=Array.from({length:Wt.n+1},(i,t)=>Wt.min+Wt.road/2+t*Wt.pitch);Wt.blockCenters=Array.from({length:Wt.n},(i,t)=>Wt.min+Wt.road+Wt.blockSize/2+t*Wt.pitch);const Hx={fog:6046564};function al(i,t,e,n=.45){const s=new he({map:i,color:t,transparent:!0,opacity:n,blending:zn,depthWrite:!1,toneMapped:!1}),r=new K(new Ze(e,e),s);return r.rotation.x=-Math.PI/2,r.renderOrder=1,r}function Vx(){const{c:i,ctx:t}=hn(512,256);for(let e=0;e<22;e++){const n=40+Math.random()*432,s=90+Math.random()*100,r=28+Math.random()*72,a=t.createRadialGradient(n,s,0,n,s,r);a.addColorStop(0,"rgba(255,220,220,0.36)"),a.addColorStop(.55,"rgba(255,190,190,0.14)"),a.addColorStop(1,"rgba(255,190,190,0)"),t.fillStyle=a,t.fillRect(n-r,s-r,r*2,r*2)}return fn(i)}function Wx(){const{c:i,ctx:t}=hn(64,64);t.translate(32,32),t.fillStyle="#fff",t.beginPath();for(let e=0;e<4;e++){const n=e/4*Math.PI*2;t.lineTo(Math.cos(n)*30,Math.sin(n)*30),t.lineTo(Math.cos(n+Math.PI/4)*8,Math.sin(n+Math.PI/4)*8)}return t.closePath(),t.fill(),fn(i)}function Xx(i,t){const e=new Pn(820,40,28),n=new ni({side:cn,depthWrite:!1,fog:!1,uniforms:{uTop:{value:new Jt(1053742)},uMid:{value:new Jt(5977958)},uHorizon:{value:new Jt(16752496)},uSunDir:{value:t.clone().normalize()}},vertexShader:`
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 uTop; uniform vec3 uMid; uniform vec3 uHorizon; uniform vec3 uSunDir;
      varying vec3 vDir;
      void main() {
        float h = clamp(vDir.y * 1.25 + 0.05, 0.0, 1.0);
        vec3 col = mix(uHorizon, uMid, smoothstep(0.0, 0.23, h));
        col = mix(col, uTop, smoothstep(0.18, 0.85, h));
        float sun = max(dot(normalize(vDir), normalize(uSunDir)), 0.0);
        col += vec3(1.0, 0.48, 0.18) * pow(sun, 7.0) * 0.55 * smoothstep(0.0, 0.28, h);
        col += vec3(1.0, 0.7, 0.35) * pow(sun, 40.0) * 0.15;
        float band = smoothstep(0.02, 0.06, h) * (1.0 - smoothstep(0.08, 0.2, h));
        col += vec3(0.45, 0.12, 0.18) * band * 0.18;
        gl_FragColor = vec4(col, 1.0);
      }
    `}),s=new K(e,n);s.renderOrder=-100,i.add(s);const r=t.clone().normalize().multiplyScalar(680),a=ii("rgba(255,236,198,1)");An(i,a,16756848,300,r,.3),An(i,a,16767392,150,r,.48);const o=new K(new Xs(17,28),new he({color:16771524,fog:!1,toneMapped:!1,transparent:!0,opacity:.95}));o.position.copy(r).multiplyScalar(.97),o.lookAt(0,0,0),i.add(o);const l=Vx();for(let c=0;c<9;c++){const h=new ti({map:l,color:c%2?16756896:12887512,transparent:!0,opacity:.28+Math.random()*.16,depthWrite:!1,fog:!1,toneMapped:!1}),u=new _i(h),f=Math.PI*(.4+Math.random()*1.2);u.position.set(Math.cos(f)*620,70+Math.random()*100,Math.sin(f)*-620);const d=190+Math.random()*240;u.scale.set(d,d*.36,1),i.add(u)}for(const[c,h,u,f,d,p]of[[-180,70,-560,640,150,.16],[220,105,-520,520,120,.12],[0,130,-610,900,200,.1]]){const _=new _i(new ti({map:l,color:16752752,transparent:!0,opacity:p,depthWrite:!1,fog:!1,toneMapped:!1}));_.position.set(c,h,u),_.scale.set(f,d,1),i.add(_)}return{sky:s,sunPos:r}}function qx(i,t){const e=new Re,n=[4016706,5001283,3292477,5985863].map(r=>new Nt({color:r,roughness:.95,metalness:0,flatShading:!0})),s=[];for(let r=0;r<9;r++){const a=new Gs(1,1,8,3);s.push(a);const o=new K(a,n[r%n.length]),l=-260+r*62+t.range(-20,20),c=34+t.range(0,58);o.scale.set(95+t.range(0,50),c,70+t.range(0,30)),o.position.set(l,c/2-4,-275-t.range(0,50)),o.rotation.y=t.range(0,Math.PI),e.add(o)}for(let r=0;r<7;r++){const a=new K(s[0],n[(r+1)%n.length]),o=16+t.range(0,20);a.scale.set(70+t.range(0,40),o,60+t.range(0,20)),a.position.set(-220+r*74,o/2-3,-205-t.range(0,20)),a.rotation.y=t.range(0,Math.PI),e.add(a)}i.add(e)}function Yx(){const i=[];for(let t=0;t<11;t++){const e=t/11*Math.PI*2+Math.random()*.22,n=2.7+Math.random()*1.2,s=.85+Math.random()*.55,r=[],a=[],o=6;for(let c=0;c<=o;c++){const h=c/o,u=.32*(1-h)*(.4+Math.sin(h*Math.PI)*.9),f=h*n,d=Math.sin(h*2.1)*.18-h*h*s;if(r.push(f,d,-u,f,d,u),c<o){const p=c*2;a.push(p,p+1,p+2,p+1,p+3,p+2)}}const l=new He;l.setAttribute("position",new ve(r,3)),l.setIndex(a),l.computeVertexNormals(),l.rotateY(e),i.push(l)}return Px(i)}function Zx(i,t,e){const n=new Nt({color:2775870,roughness:.88,side:qe,metalness:.02}),s=new Nt({color:3829318,roughness:.9,side:qe,metalness:.02}),r=new Nt({color:6965810,roughness:.95}),a=Yx(),o=new Ie(.15,.32,5.6,7,4),l=[];for(const[c,h,u=1]of t){const f=new Re,d=new K(o,r);d.position.y=2.8,d.rotation.z=(Math.random()-.5)*.08,f.add(d);const p=new K(a,Math.random()>.45?n:s);p.position.y=5.6,p.rotation.y=Math.random()*Math.PI*2,f.add(p);const _=al(ii("rgba(0,0,0,1)"),0,5.5,.28);_.material.blending=es,_.position.y=.035,f.add(_),f.position.set(c,0,h),f.scale.setScalar(u),f.rotation.y=Math.random()*Math.PI*2,i.add(f),l.push(f)}return l}function $x(i,t,e){const n=[],s=[],r=[];for(let m=0;m<6;m++)r.push(Fx(m,100+m*31));const a=new Map,o=[7301744,6117988,7958635,4999768].map(m=>new Nt({color:m,roughness:.92,metalness:.06})),l=new Nt({color:10129804,roughness:.82}),c=new Nt({color:1054244,roughness:.2,metalness:.75});function h(m,g,v){const b=`${m}:${Math.round(g/8)}:${Math.round(v/10)}`;if(a.has(b))return a.get(b);const S=r[m],T=S.map.clone();T.needsUpdate=!0,T.wrapS=T.wrapT=rs,T.repeat.set(Math.max(1,Math.round(g/13)),Math.max(1,Math.round(v/14)));const w=S.emissiveMap.clone();w.needsUpdate=!0,w.wrapS=w.wrapT=rs,w.repeat.copy(T.repeat);const x=new Nt({map:T,emissiveMap:w,emissive:16777215,emissiveIntensity:.7,roughness:.82,metalness:.05});return a.set(b,x),x}function u(m,g,v,b,S,T,w={}){const x=h(T,v,S),M=o[Math.floor(t.next()*o.length)],C=new Ut(v,S,b),A=new K(C,[x,x,M,M,x,x]);A.position.set(m,.18+S/2,g),i.add(A),n.push({minX:m-v/2,maxX:m+v/2,minZ:g-b/2,maxZ:g+b/2,h:S});const I=new K(new Ut(v+.55,.45,b+.55),l);I.position.set(m,.18+S+.2,g),i.add(I);const N=t.int(1,3);for(let F=0;F<N;F++){const L=t.range(1.2,Math.min(4.4,v*.25)),z=t.range(1.2,Math.min(3.6,b*.25)),X=t.range(.5,1.8),G=new K(new Ut(L,X,z),c);G.position.set(m+t.range(-v*.28,v*.28),.18+S+.4+X/2,g+t.range(-b*.28,b*.28)),i.add(G)}if(w.neon||t.chance(.4)){const F=r[T].accent,L=new he({color:F,toneMapped:!1}),z=new K(new Ut(.09,S*.88,.09),L),X=t.chance(.5)?-1:1,G=t.chance(.5)?-1:1;if(z.position.set(m+X*(v/2+.02),.18+S*.47,g+G*(b/2+.02)),i.add(z),t.chance(.3)){const it=z.clone();it.position.x=m-X*(v/2+.02),i.add(it)}}if(S>13&&w.store!==!1){const L=new K(new Ut(v+.16,3.1,b+.16),c);L.position.set(m,.18+3.1/2,g),i.add(L);const z=new K(new Ut(v*.72,.12,.12),new he({color:t.chance(.5)?16765322:9434367,toneMapped:!1}));z.position.set(m,.18+2.85,g+b/2+.09),i.add(z)}if(S>46&&t.chance(.55)){const F=new K(new Ie(.09,.18,8,5),c);F.position.set(m,.18+S+4.4,g),i.add(F);const L=new K(new Pn(.28,8,6),new he({color:16724032,toneMapped:!1}));L.position.set(m,.18+S+8.4,g),i.add(L)}return s.push({x:m,z:g,w:v,d:b,h:S,variant:T,accent:r[T].accent}),A}const f=[{lines:["VOLT","THE FUTURE IS ELECTRIC","NEON MOTORS"],colors:["#66f4ff","#ff2e7e"]},{lines:["NEON STATE","2026","SAN ANDREAS"],colors:["#ff7cb1","#ffc857"]},{lines:["APEX","JOIN THE PATROL","LSPD"],colors:["#64a8ff","#ffffff"]},{lines:["LUMEN","CITY PROOF","KITE MOBILITY"],colors:["#ff7cf0","#66f4ff"]}];let d=0;for(const m of e){if(m.type!=="buildings"&&m.type!=="landmark")continue;const{x:g,z:v,i:b,j:S}=m,T=S<=1,w=Math.floor(t.next()*6),x=T?1.7:1,M=t.int(0,2);if(m.landmark){u(g,v,22,22,62,3,{neon:!0}),u(g,v,16,16,86,3,{neon:!0,store:!1}),u(g,v,8,8,96,3,{neon:!0,store:!1});const C=new K(new Ie(.12,.4,18,6),c);C.position.set(g,.18+96+9,v),i.add(C);const A=new K(new Pn(.5,8,6),new he({color:16732018,toneMapped:!1}));A.position.set(g,.18+96+18,v),i.add(A),s.push({x:g,z:v,w:22,d:22,h:96,variant:3,accent:"#c4d4ff"});continue}if(M===0){const C=t.range(17,25),A=t.range(17,24),I=xe(t.range(13,34)*x,10,62),N=t.range(-(40-C)/2+1,(40-C)/2-1),F=t.range(-(40-A)/2+1,(40-A)/2-1);u(g+N,v+F,C,A,I,w)}else if(M===1){const C=xe(t.range(20,44)*x,15,72);u(g-8.5,v-7,18,17,C,w);const A=t.range(11,15),I=t.range(11,15);u(g+9,v+9.5,A,I,xe(t.range(9,24),8,38),(w+2)%6)}else{const C=t.range(22,28),A=t.range(20,26),I=t.range(5.2,9),N=C*t.range(.52,.7),F=A*t.range(.5,.68),L=xe(t.range(26,54)*x,18,78);u(g,v,C,A,I,(w+1)%6,{store:!1,neon:!1}),u(g+t.range(-1.5,1.5),v+t.range(-1.5,1.5),N,F,L,w)}if(d<f.length&&t.chance(.55)&&(b+S)%2===0){const C=f[d++],A=_(C),I=13,N=8,F=new K(new Ze(I,N),new he({map:A,toneMapped:!1,side:qe}));F.position.set(g+t.range(-8,8),13+t.range(0,8),v+21.2),F.rotation.y=0,i.add(F);const L=new K(new Ut(I+.6,N+.6,.4),p());L.position.copy(F.position),L.position.z-=.22,L.rotation.y=0,i.add(L);const z=new Ns(16743601,22,26,2);z.position.set(F.position.x,F.position.y,F.position.z+5),i.add(z)}}function p(){return new Nt({color:1512991,roughness:.8})}function _(m){return Jx(m.lines,m.colors)}return{colliders:n,landmarks:s}}let za=null;function Jx(i,t){return za||(za=Kx),za(i,t)}function Kx(i,t){const{c:e,ctx:n}=hn(512,320),s=n.createLinearGradient(0,0,512,320);s.addColorStop(0,"#100b22"),s.addColorStop(.55,"#1b1030"),s.addColorStop(1,"#2a0e2c"),n.fillStyle=s,n.fillRect(0,0,512,320),n.strokeStyle=t[1],n.lineWidth=5,n.strokeRect(14,14,484,292),n.textAlign="center",n.fillStyle="#fff",n.shadowColor=t[0],n.shadowBlur=26,n.font='900 78px "Arial Black", Arial, sans-serif',n.fillText(i[0],256,140),n.shadowBlur=0,n.fillStyle=t[0],n.font="800 30px Arial, sans-serif",n.fillText(i[1],256,208),n.fillStyle="rgba(255,255,255,0.6)",n.font="800 18px Arial, sans-serif",n.fillText(i[2],256,260);for(let r=0;r<30;r++)n.fillStyle=`rgba(255,255,255,${Math.random()*.04})`,n.fillRect(14,14+Math.random()*292,484,2);return fn(e)}function Qx(i,t){const e=new Re,n=16723582,s=6747391,r=new K(new Xs(23,64),new Nt({color:1316386,roughness:.24,metalness:.55}));r.rotation.x=-Math.PI/2,r.position.y=.296,r.scale.z=.9,i.add(r);const a=ii();for(const[S,T,w,x,M]of[[-9,65,16723582,34,.1],[10,68,6747391,30,.1],[0,50,16762967,20,.08]]){const C=new K(new Ze(x,x*.6),new he({map:a,color:w,transparent:!0,opacity:M,blending:zn,depthWrite:!1,toneMapped:!1}));C.rotation.x=-Math.PI/2,C.position.set(S,.301,T),C.renderOrder=1,i.add(C)}for(const[S,T,w]of[[14.5,6747391,.8],[19.5,16723582,.65]]){const x=new K(new hs(S,S+.12,96),new he({color:T,transparent:!0,opacity:w,side:qe,toneMapped:!1}));x.rotation.x=-Math.PI/2,x.position.y=.305,x.scale.z=.9,i.add(x)}const o=new Re,l=new K(new Ut(30,4.8,8.6),new Nt({color:921885,roughness:.25,metalness:.65}));l.position.y=2.4,o.add(l);const c=new K(new Ut(28,3.5,.25),new il({color:8185855,emissive:1735574,emissiveIntensity:.4,transparent:!0,opacity:.26,roughness:.08,metalness:.2}));c.position.set(0,2.05,4.4),o.add(c);for(let S=-2;S<=2;S++){const T=new K(new Ut(.16,3.7,.3),new Nt({color:3818325,metalness:.8,roughness:.3}));T.position.set(S*5.6,2.05,4.42),o.add(T)}for(const S of[-9,-3,3,9]){const T=new K(new Ut(.08,3.3,.2),new he({color:s,toneMapped:!1}));T.position.set(S,1.95,4.36),o.add(T)}const h=Gx("NEON MOTORS",{color:"#ff2e7e",bg:"rgba(6,7,14,0.94)",sub:"ELECTRIC PERFORMANCE · LOS SANTOS",w:1024,h:220}),u=new he({map:h,toneMapped:!1}),f=new K(new Ze(13.8,2.96),u);f.position.set(0,3.3,4.62),o.add(f);const d=new K(new Ut(14.6,3.5,.35),new Nt({color:658194,metalness:.6,roughness:.4}));d.position.set(0,3.3,4.4),o.add(d),o.position.set(0,.2,43.1),i.add(o),t.push({minX:-15,maxX:15,minZ:38.5,maxZ:47.5,h:5.2});const p=new Nt({color:1316900,metalness:.75,roughness:.3});for(const S of[-16.5,16.5]){const T=new K(new Ut(.65,4.2,.65),p);T.position.set(S,2.1+.2,51.5),i.add(T),t.push({minX:S-.45,maxX:S+.45,minZ:51,maxZ:52,h:4.2});const w=new K(new Ut(.12,3.2,.12),new he({color:n,toneMapped:!1}));w.position.set(S,2.1,51.84),i.add(w)}const _=new K(new Ut(34.1,.4,.65),p);_.position.set(0,4.35,51.5),i.add(_);const m=new Ns(10480127,48,26,2);m.position.set(0,7.5,58),i.add(m);const g=new Ns(16727948,28,22,2);g.position.set(-15,3.5,62),i.add(g);const v=new Ns(16763274,24,20,2);v.position.set(15,3.5,62),i.add(v);const b=new Nt({color:2829620,roughness:.85});for(const S of[-21,21]){const T=new K(new Ut(2.4,.8,6),b);T.position.set(S,.6,61),i.add(T);const w=new K(new Pn(1.25,8,6),new Nt({color:3629121,roughness:.9}));w.position.set(S,1.35,61),w.scale.z=2.1,i.add(w)}i.add(e)}function jx(i,t){const e=new K(new Ze(620,66),new Nt({map:Ux(),roughness:.96,metalness:0}));e.rotation.x=-Math.PI/2,e.position.set(0,.02,201),i.add(e);const n=new Nt({color:5981750,roughness:.85}),s=new K(new Ut(620,.18,6),n);s.position.set(0,.12,172),i.add(s);const r=ii("rgba(255,255,255,0.9)");for(let _=0;_<7;_++){const m=al(r,14284031,40+t.range(0,60),.14);m.position.set(-250+_*78,.05,231.6),m.scale.x=1.7,i.add(m)}const a=new Re,o=new Nt({color:14140834,roughness:.8});for(const _ of[-2,2])for(const m of[-1.4,1.4]){const g=new K(new Ie(.12,.16,4.2,6),o);g.position.set(_,2.1,m),a.add(g)}const l=new K(new Ut(4.4,2.4,3.2),new Nt({color:16739165,roughness:.7}));l.position.y=4.7,a.add(l);const c=new K(new Gs(3.8,1.3,4),new Nt({color:15262420,roughness:.7}));c.position.y=6.55,c.rotation.y=Math.PI/4,a.add(c),a.position.set(-44,0,195),a.rotation.y=-.25,i.add(a);const h=[16735631,5429759,16764764,9306022];for(let _=0;_<9;_++){const m=-175+_*39+t.range(-8,8),g=188+t.range(-6,8),v=new K(new Ie(.06,.06,2.9,6),o);v.position.set(m,1.45,g),i.add(v);const b=new K(new Gs(2.2,.75,10),new Nt({color:h[_%4],roughness:.8,side:qe}));b.position.set(m,2.9,g),i.add(b);const S=new K(new Ut(.85,.16,2.1),new Nt({color:15656663,roughness:.7}));S.position.set(m+2.4,.35,g+.8),S.rotation.y=.4,i.add(S)}const u=new Re,f=new Nt({color:6966069,roughness:.9}),d=new K(new Ut(11,.3,84),f);d.position.set(0,.55,0),u.add(d);for(let _=0;_<14;_++)for(const m of[-4.6,4.6]){const g=new K(new Ie(.18,.2,4.4,6),f);g.position.set(m,-1.2,-39+_*6),u.add(g)}const p=new Nt({color:4075044,roughness:.8});for(const _ of[-5.2,5.2]){const m=new K(new Ut(.1,.1,84),p);m.position.set(_,1.5,0),u.add(m);for(let g=0;g<10;g++){const v=new K(new Ut(.09,1,.09),p);v.position.set(_,1.1,-38+g*8.5),u.add(v)}}u.position.set(-78,0,272),i.add(u),t_(i,96,0,204)}function t_(i,t,e,n){const s=new Re,r=new Nt({color:13489891,metalness:.85,roughness:.3}),a=new he({color:16727948,toneMapped:!1}),o=new he({color:6747391,toneMapped:!1}),l=15,c=21;for(const f of[-1.1,1.1]){const d=new K(new ei(l,.16,6,48),f<0?a:o);d.position.set(0,c,f),s.add(d);const p=new K(new ei(l*.55,.1,5,36),r);p.position.set(0,c,f),s.add(p);for(let _=0;_<12;_++){const m=_/12*Math.PI*2,g=new K(new Ie(.055,.055,l,4),r);g.position.set(Math.cos(m)*l*.5,c+Math.sin(m)*l*.5,f),g.rotation.z=m+Math.PI/2,s.add(g)}}for(const f of[-6.5,6.5]){const d=new K(new Ie(.3,.4,c+2,6),r);d.position.set(f,(c+2)/2,0),d.rotation.z=f<0?-.26:.26,s.add(d)}const h=[16727948,6747391,16762967,9264127,7208870];for(let f=0;f<12;f++){const d=f/12*Math.PI*2,p=new K(new Ut(2.2,1.7,2.2),new Nt({color:h[f%5],roughness:.5,metalness:.3}));p.position.set(Math.cos(d)*l,c+Math.sin(d)*l,0),s.add(p)}const u=new Ns(16740264,100,60,2);u.position.set(0,c,4),s.add(u),s.position.set(t,e,n),s.rotation.y=.15,i.add(s)}function e_(i){const t=new Nt({color:2369070,metalness:.7,roughness:.45}),e=new he({color:16766880,toneMapped:!1}),n=ii("rgba(255,220,160,1)"),s=ii(),r=[];for(const a of[Wt.roadCenters[2],Wt.roadCenters[3],Wt.roadCenters[4]])for(const o of[-138,-74,-10,54,118])r.push([o,a+8.9],[o+20,a-8.9]);for(const a of[Wt.roadCenters[2],Wt.roadCenters[4]])for(const o of[-138,-74,54,118])r.push([a+8.9,o],[a-8.9,o+20]);for(const[a,o]of r){const l=new Re,c=new K(new Ie(.07,.11,5.4,6),t);c.position.y=2.7,l.add(c);const h=new K(new Ut(1.5,.08,.08),t);h.position.set(.65,5.35,0),l.add(h);const u=new K(new Ut(.58,.13,.26),e);u.position.set(1.25,5.28,0),l.add(u),An(l,n,16761466,2.2,new P(1.25,5.24,0),.55);const f=al(s,16758128,9,.2);f.position.set(1.25,.22,0),l.add(f),l.position.set(a,0,o),l.rotation.y=Math.random()>.5?0:Math.PI,i.add(l)}}function n_(i){const t=new Nt({color:1908776,metalness:.7,roughness:.4}),e=[[-32,96],[32,96],[-96,64],[96,64],[-32,32],[32,32]];for(const[n,s]of e){const r=new Re,a=new K(new Ie(.08,.12,5.8,6),t);a.position.y=2.9,r.add(a);const o=new K(new Ut(3.4,.1,.1),t);o.position.set(1.7,5.6,0),r.add(o);const l=new K(new Ut(.38,1.02,.3),t);l.position.set(3.25,5.15,0),r.add(l),[16723512,16762967,7208870].forEach((h,u)=>{const f=new K(new Xs(.11,10),new he({color:h,toneMapped:!1}));f.position.set(3.25,5.47-u*.3,.16),f.material.opacity=u===0?1:.18,f.material.transparent=!0,r.add(f)}),r.position.set(n+8.9,0,s+8.9),r.rotation.y=Math.random()>.5?0:Math.PI,i.add(r)}}function i_(i){const t=new Ut(3.2,.02,.17),e=new Nt({color:15196882,roughness:.72,metalness:.05}),n=[];for(const p of Wt.roadCenters)for(const _ of[-1,1]){for(let m=Wt.min+6;m<Wt.max-4;m+=8)n.push({x:m,z:p+_*4.1,rot:0});for(let m=Wt.min+6;m<Wt.max-4;m+=8)n.push({x:p+_*4.1,z:m,rot:Math.PI/2})}const s=new jl(t,e,n.length),r=new _e,a=new Ii,o=new P(1,1,1);n.forEach((p,_)=>{a.setFromAxisAngle(new P(0,1,0),p.rot),r.compose(new P(p.x,.028,p.z),a,o),s.setMatrixAt(_,r)}),s.instanceMatrix.needsUpdate=!0,i.add(s);const l=new he({color:13476427});for(const p of Wt.roadCenters)for(const _ of[-.18,.18]){const m=new K(new Ut(Wt.max-Wt.min-8,.02,.1),l);m.position.set(0,.026,p+_),i.add(m);const g=new K(new Ut(.1,.02,Wt.max-Wt.min-8),l);g.position.set(p+_,.026,0),i.add(g)}const c=new Nt({color:14999506,roughness:.8}),h=[],u=[Wt.roadCenters[2],Wt.roadCenters[3],Wt.roadCenters[4]];for(const p of u)for(const _ of u)for(let m=-3;m<=3;m++)h.push({x:p+m*1.35,z:_+7.2,rot:0}),h.push({x:p+m*1.35,z:_-7.2,rot:0}),h.push({x:p+7.2,z:_+m*1.35,rot:Math.PI/2}),h.push({x:p-7.2,z:_+m*1.35,rot:Math.PI/2});const f=new Ut(.74,.02,3.2),d=new jl(f,c,h.length);h.forEach((p,_)=>{a.setFromAxisAngle(new P(0,1,0),p.rot),r.compose(new P(p.x,.03,p.z),a,o),d.setMatrixAt(_,r)}),d.instanceMatrix.needsUpdate=!0,i.add(d)}function s_(i){const t=new Ze(1600,1200,70,50),e=new ni({transparent:!1,uniforms:{uTime:{value:0}},vertexShader:`
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vW;
      void main() {
        vUv = uv;
        vec3 p = position;
        p.z += sin(p.x * 0.09 + uTime * 1.2) * 0.35 + cos(p.y * 0.13 - uTime * 0.8) * 0.22;
        vec4 wp = modelMatrix * vec4(p, 1.0);
        vW = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,fragmentShader:`
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vW;
      void main() {
        float depth = 1.0 - vUv.y;
        vec3 shore = vec3(0.20, 0.52, 0.57);
        vec3 mid = vec3(0.10, 0.22, 0.35);
        vec3 far = vec3(0.20, 0.16, 0.28);
        vec3 col = mix(shore, mid, smoothstep(0.0, 0.35, depth));
        col = mix(col, far, smoothstep(0.35, 1.0, depth));
        float wave = sin(vW.x * 0.16 + uTime * 1.1) * sin(vW.z * 0.22 - uTime * 0.7);
        float glitter = pow(max(0.0, wave), 12.0);
        col += vec3(1.0, 0.65, 0.36) * glitter * 0.35 * (1.0 - smoothstep(0.0, 0.7, depth));
        float sunStreak = smoothstep(0.72, 1.0, sin(vW.x * 0.03 + 1.2)) * (1.0 - smoothstep(0.0, 0.55, depth));
        col += vec3(1.0, 0.5, 0.22) * sunStreak * 0.12;
        float foam = smoothstep(0.03, 0.0, depth) * (0.55 + 0.45 * sin(vW.x * 0.5 + uTime * 2.0));
        col = mix(col, vec3(0.85, 0.93, 0.94), foam * 0.55);
        gl_FragColor = vec4(col, 1.0);
      }
    `}),n=new K(t,e);return n.rotation.x=-Math.PI/2,n.position.set(0,-.12,830),i.add(n),e}function r_(i,t){const{c:e,ctx:n}=hn(1024,512),s=n.createLinearGradient(0,0,0,300);s.addColorStop(0,"#0a0e22"),s.addColorStop(.55,"#33204c"),s.addColorStop(.86,"#7c3a63"),s.addColorStop(1,"#ff9a64"),n.fillStyle=s,n.fillRect(0,0,1024,300);const r=n.createLinearGradient(0,258,0,330);r.addColorStop(0,"rgba(255,150,90,0)"),r.addColorStop(.35,"rgba(255,138,96,0.5)"),r.addColorStop(1,"rgba(20,16,32,0)"),n.fillStyle=r,n.fillRect(0,258,1024,72);let a=0,o=7;const l=()=>(o=o*16807%2147483647)/2147483647;for(;a<1024;){const d=14+l()*38,p=20+l()*58;n.fillStyle=`rgba(9,10,20,${.72+l()*.2})`,n.fillRect(a,300-p,d,p+24);for(let _=300-p+6;_<296;_+=7)for(let m=a+4;m<a+d-4;m+=7)l()>.55&&(n.fillStyle=l()>.5?"rgba(120,235,255,0.7)":"rgba(255,120,190,0.55)",n.fillRect(m,_,2,2));a+=d+3+l()*9}for(const[d,p,_,m]of[[150,292,70,"rgba(255,60,150,0.55)"],[720,286,60,"rgba(70,225,255,0.5)"],[470,296,45,"rgba(255,190,110,0.5)"]]){const g=n.createRadialGradient(d,p,0,d,p,_);g.addColorStop(0,m),g.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=g,n.fillRect(d-_,p-_,_*2,_*2)}const c=n.createLinearGradient(0,320,0,512);c.addColorStop(0,"#241a2c"),c.addColorStop(.5,"#121019"),c.addColorStop(1,"#08070c"),n.fillStyle=c,n.fillRect(0,320,1024,192);const h=new Th(e);h.mapping=Ir,h.colorSpace=ln;const u=new Ws(t),f=u.fromEquirectangular(h).texture;i.environment=f,i.environmentIntensity=.85,h.dispose(),u.dispose()}function a_(i,t){const e=ta(20261031),n=[],s=[];i.fog=new Ko(Hx.fog,105,640),i.background=new Jt(1775408),r_(i,t);const r=new Cd(8947933,3416874,.78);i.add(r);const a=new P(-.62,.24,-.75),o=new mc(16754286,2.35);o.position.copy(a).multiplyScalar(300),i.add(o);const l=new mc(7306751,.38);l.position.set(80,45,140),i.add(l);const c=new Nd(2366520,.55);i.add(c),Xx(i,a),qx(i,e);const h=new K(new Ze(700,700),new Nt({color:5721157,roughness:1}));h.rotation.x=-Math.PI/2,h.position.y=-.06,i.add(h);const u=new K(new Ze(Wt.max-Wt.min+22,Wt.max-Wt.min+22),new Nt({map:Dx(),roughness:.93,metalness:.02,color:9803174}));u.rotation.x=-Math.PI/2,u.position.y=0,i.add(u);const f=[];for(let M=0;M<Wt.n;M++)for(let C=0;C<Wt.n;C++){const A=Wt.blockCenters[M],I=Wt.blockCenters[C];let N="buildings";M===2&&C===3?N="plaza":M===1&&C===2?N="park":M===3&&C===3?N="parking":M===2&&C===0?N="landmark":e.chance(.08)&&(N="park"),f.push({i:M,j:C,x:A,z:I,type:N,landmark:N==="landmark"})}const d=Nx();d.repeat.set(12,12);const p=Ox();p.repeat.set(6,6);const _=new Nt({color:8485490,roughness:.9}),m=new Nt({map:p,roughness:.95});for(const M of f){const C=new K(new Ut(Wt.blockSize,.18,Wt.blockSize),new Nt({map:d,roughness:.9,color:12893102}));if(C.position.set(M.x,.09,M.z),i.add(C),M.type==="park"){const I=new K(new Ze(39,39),m);I.rotation.x=-Math.PI/2,I.position.set(M.x,.2,M.z),i.add(I);const N=new Nt({color:12035468,roughness:.9});for(const G of[0,Math.PI/2]){const it=new K(new Ze(39,3.2),N);it.rotation.x=-Math.PI/2,it.rotation.z=G,it.position.set(M.x,.205,M.z),i.add(it)}const F=new K(new Ie(5,5.3,.7,24),_);F.position.set(M.x,.55,M.z),i.add(F);const L=new K(new Ie(4.5,4.5,.15,24),new he({color:5687766,transparent:!0,opacity:.75}));L.position.set(M.x,.92,M.z),i.add(L);const z=new K(new Ie(.5,.8,3.6,12),_);z.position.set(M.x,2.5,M.z),i.add(z);const X=new K(new Ie(2.4,1.6,.5,18),_);X.position.set(M.x,4.2,M.z),i.add(X);for(let G=0;G<5;G++)s.push([M.x-14+G*7,M.z+(G%2?15:-15),.75+e.range(0,.2)])}if(M.type==="parking"){const I=new K(new Ze(39,39),new Nt({color:2303022,roughness:.9}));I.rotation.x=-Math.PI/2,I.position.set(M.x,.19,M.z),i.add(I);const N=new he({color:13223096});for(let F=-3;F<=3;F++){const L=new K(new Ut(.12,.01,9),N);L.position.set(M.x+F*4.4,.2,M.z-10),i.add(L);const z=L.clone();z.position.z=M.z+10,i.add(z)}}const A=new K(new Ut(Wt.blockSize+.4,.24,Wt.blockSize+.4),_);A.position.set(M.x,.12,M.z),i.add(A),C.position.y=.2,C.scale.set(.995,1,.995)}Qx(i,n);const g=$x(i,e,f);n.push(...g.colliders);for(const M of f){if(M.type==="buildings"||M.type==="landmark")for(const[C,A]of[[-21,-21],[21,-21],[-21,21],[21,21]])e.chance(.46)&&s.push([M.x+C,M.z+A,.85+e.range(0,.35)]);if(M.type==="plaza")for(const[C,A]of[[-21,-16],[21,-16],[-21,5],[21,5],[-18,23],[18,23]])s.push([M.x+C,M.z+A,.95]);if(M.type==="parking")for(const[C,A]of[[-17,17],[17,17]])s.push([M.x+C,M.z+A,1.05])}for(let M=0;M<12;M++)s.push([-150+M*27+e.range(-3,3),164+e.range(-1,2),1+e.range(0,.4)]);for(let M=0;M<14;M++)s.push([-240+M*36,182+e.range(-4,10),.9+e.range(0,.5)]);for(let M=0;M<8;M++)s.push([-166+e.range(-2,2),-120+M*32,.9+e.range(0,.3)]);const v=Zx(i,s.filter(M=>Math.abs(M[0])<260));i_(i),e_(i),n_(i),jx(i,e);const b=s_(i),S=new He,T=new Float32Array(420*3);for(let M=0;M<420;M++)T[M*3]=e.range(-150,150),T[M*3+1]=e.range(1,26),T[M*3+2]=e.range(-150,170);S.setAttribute("position",new Ln(T,3));const w=new Hf(S,new bh({color:16767144,size:.09,transparent:!0,opacity:.45,depthWrite:!1,blending:zn}));i.add(w);const x=Wx();for(let M=0;M<26;M++){const C=new _i(new ti({map:x,color:16773584,transparent:!0,opacity:.55,depthWrite:!1,toneMapped:!1,fog:!1})),A=e.range(-260,260),I=e.range(176,240);C.position.set(A,e.range(16,30),I),C.scale.setScalar(e.range(.35,.7)),i.add(C)}return{colliders:n,palms:v,blockTypes:f,landmarks:g.landmarks,showcase:{x:0,z:64,heading:0},spawn:{x:-2.8,z:68.5,heading:Math.PI},missionSpots:[new P(-32,0,-22),new P(96,0,94),new P(-128,0,-30),new P(30,0,130),new P(-96,0,64),new P(160,0,-96),new P(32,0,-128)],shardSpots:[new P(-10,.6,82),new P(-64,.6,0),new P(78,.6,40),new P(30,.6,-64),new P(-96,.6,112),new P(128,.6,128),new P(-64,.6,-128),new P(140,.6,190),new P(-120,.6,196),new P(40,.6,96)],update(M,C){b.uniforms.uTime.value=C,w.position.y=Math.sin(C*.12)*.4,w.rotation.y=C*.004;for(let A=0;A<v.length;A++){const I=v[A];I&&(I.rotation.z=Math.sin(C*.7+A)*.008)}}}}const ws=new P;function vn(i,t,e,n,s,r){const a=2*Math.PI*s/4,o=Math.max(r-2*s,0),l=Math.PI/4;ws.copy(t),ws[n]=0,ws.normalize();const c=.5*a/(a+o),h=1-ws.angleTo(i)/l;return Math.sign(ws[e])===1?h*c:o/(a+o)+c+c*(1-h)}class ea extends Ut{constructor(t=1,e=1,n=1,s=2,r=.1){const a=s*2+1;if(r=Math.min(t/2,e/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:s,radius:r},a===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const l=new P,c=new P,h=new P(t,e,n).divideScalar(2).subScalar(r),u=this.attributes.position.array,f=this.attributes.normal.array,d=this.attributes.uv.array,p=u.length/6,_=new P,m=.5/a;for(let g=0,v=0;g<u.length;g+=3,v+=2)switch(l.fromArray(u,g),c.copy(l),c.x-=Math.sign(c.x)*m,c.y-=Math.sign(c.y)*m,c.z-=Math.sign(c.z)*m,c.normalize(),u[g+0]=h.x*Math.sign(l.x)+c.x*r,u[g+1]=h.y*Math.sign(l.y)+c.y*r,u[g+2]=h.z*Math.sign(l.z)+c.z*r,f[g+0]=c.x,f[g+1]=c.y,f[g+2]=c.z,Math.floor(g/p)){case 0:_.set(1,0,0),d[v+0]=vn(_,c,"z","y",r,n),d[v+1]=1-vn(_,c,"y","z",r,e);break;case 1:_.set(-1,0,0),d[v+0]=1-vn(_,c,"z","y",r,n),d[v+1]=1-vn(_,c,"y","z",r,e);break;case 2:_.set(0,1,0),d[v+0]=1-vn(_,c,"x","z",r,t),d[v+1]=vn(_,c,"z","x",r,n);break;case 3:_.set(0,-1,0),d[v+0]=1-vn(_,c,"x","z",r,t),d[v+1]=1-vn(_,c,"z","x",r,n);break;case 4:_.set(0,0,1),d[v+0]=1-vn(_,c,"x","y",r,t),d[v+1]=1-vn(_,c,"y","x",r,e);break;case 5:_.set(0,0,-1),d[v+0]=vn(_,c,"x","y",r,t),d[v+1]=1-vn(_,c,"y","x",r,e);break}}static fromJSON(t){return new ea(t.width,t.height,t.depth,t.segments,t.radius)}}const Xr=[{id:"volt",name:"VOLT GT",brand:"NEON MOTORS",className:"ELECTRIC HYPERCAR",color:2611442,accent:8189695,shape:"hyper",drivetrain:"TRI-MOTOR AWD",width:2.08,length:4.66,wheelbase:2.86,wheelRadius:.38,rideHeight:.24,spec:{top:340,accel:1.9,handling:"S+"}},{id:"cyber",name:"CYBER X",brand:"ARC SYSTEMS",className:"STAINLESS PICKUP",color:13028566,accent:16054271,shape:"cyber",drivetrain:"QUAD-MOTOR AWD",width:2.18,length:5.62,wheelbase:3.42,wheelRadius:.44,rideHeight:.4,spec:{top:209,accel:2.8,handling:"B"}},{id:"aero",name:"AERO S",brand:"NEON MOTORS",className:"LUXURY ELECTRIC SEDAN",color:15856372,accent:11139071,shape:"sedan",drivetrain:"DUAL-MOTOR AWD",width:1.97,length:4.94,wheelbase:2.96,wheelRadius:.37,rideHeight:.25,spec:{top:322,accel:2.2,handling:"A+"}},{id:"mantis",name:"MANTIS R",brand:"RONIN EV",className:"ELECTRIC SUPERBIKE",color:9174853,accent:7208870,shape:"bike",drivetrain:"CHAIN DRIVE",width:.82,length:2.26,wheelbase:1.52,wheelRadius:.34,rideHeight:0,spec:{top:300,accel:2,handling:"S"}},{id:"titan",name:"TITAN EV",brand:"SIERRA WORKS",className:"ADVENTURE PICKUP",color:16743221,accent:16757084,shape:"truck",drivetrain:"4×4 DUAL-MOTOR",width:2.17,length:5.34,wheelbase:3.2,wheelRadius:.45,rideHeight:.38,spec:{top:201,accel:3.4,handling:"C+"}},{id:"nova",name:"NOVA SUV",brand:"AURELION",className:"PERFORMANCE ELECTRIC SUV",color:3426922,accent:10189823,shape:"suv",drivetrain:"DUAL-MOTOR AWD",width:2.06,length:4.98,wheelbase:3.02,wheelRadius:.41,rideHeight:.3,spec:{top:251,accel:2.9,handling:"B+"}},{id:"lumen",name:"LUMEN",brand:"KITE MOBILITY",className:"URBAN ELECTRIC HATCH",color:14070783,accent:16743664,shape:"compact",drivetrain:"FWD SINGLE MOTOR",width:1.8,length:3.94,wheelbase:2.5,wheelRadius:.34,rideHeight:.22,spec:{top:178,accel:4.1,handling:"B"}},{id:"apex",name:"APEX P-9",brand:"LSPD",className:"PURSUIT INTERCEPTOR",color:1119519,accent:6596863,shape:"police",drivetrain:"DUAL-MOTOR AWD",width:2,length:5.02,wheelbase:3,wheelRadius:.39,rideHeight:.26,spec:{top:290,accel:2.4,handling:"A"}}],o_=new Nt({color:921107,roughness:.92,metalness:.05}),l_=new Nt({color:12173514,roughness:.26,metalness:.92}),on=new Nt({color:1119259,roughness:.62,metalness:.45}),Ga=new il({color:66e4,roughness:.08,metalness:.7,transparent:!0,opacity:.86,clearcoat:1,clearcoatRoughness:.08}),No=new he({color:16120831,toneMapped:!1}),Qh=new he({color:16717880,toneMapped:!1});new he({color:14673903,toneMapped:!1});let mn=null;function Gc(i,t,e=18,n=6747391){const s=new Re,r=new Re;s.add(r);const a=i*.24,o=new ei(i-a,a,8,e),l=new K(o,o_);l.scale.z=t/(a*2),l.rotation.y=Math.PI/2,l.castShadow=!1,r.add(l);const c=new Ie(i*.64,i*.64,t*1.1,Math.max(10,e-4),1),h=new K(c,l_);h.rotation.z=Math.PI/2,r.add(h);const u=new Ie(i*.24,i*.24,t*1.16,8),f=new K(u,on);f.rotation.z=Math.PI/2,r.add(f);const d=new he({color:n,toneMapped:!1,transparent:!0,opacity:.9});for(const p of[-1,1]){const _=new K(new ei(i*.58,.013,5,22),d);_.rotation.y=Math.PI/2,_.position.x=p*t*.585,r.add(_)}return{pivot:s,spin:r}}function Ae(i,t,e,n=.14,s=on){const r=new ea(i,t,e,3,Math.min(n,Math.min(i,t,e)*.45));return new K(r,s)}function c_(i,t,e,n,s,r=-.18){const a=new nl;a.moveTo(-e/2,0),a.lineTo(e/2,0),a.lineTo(e/2-(e-n)*.28,t),a.lineTo(-e/2+(e-n)*.72,t),a.lineTo(-e/2,0);const o=new Jr(a,{depth:i,bevelEnabled:!1,steps:1});o.translate(0,0,-i/2),o.rotateY(Math.PI/2),o.computeVertexNormals();const l=new K(o,s);return l.position.z=r,l}function h_(i,t,e,n,s,r){const a=new nl;a.moveTo(-e/2,0),a.lineTo(e/2,0),a.lineTo(e/2-n*e,t),a.lineTo(-e/2+s*e,t),a.lineTo(-e/2,0);const o=new Jr(a,{depth:i,bevelEnabled:!0,bevelSize:.04,bevelThickness:.04,bevelSegments:2,steps:1});return o.translate(0,0,-i/2),o.rotateY(Math.PI/2),o.computeVertexNormals(),new K(o,r)}function u_(i,t,e){const n=[],{width:s,wheelbase:r,wheelRadius:a,rideHeight:o}=t,l=s/2-(t.shape==="bike"?0:.04),c=r/2;if(t.shape==="bike"){for(const u of[c,-c]){const f=Gc(a,.2,20,t.accent);f.pivot.position.set(0,a,u),i.add(f.pivot),n.push({...f,front:u>0})}return n}const h=[[l,c,!0],[-l,c,!0],[l,-c,!1],[-l,-c,!1]];for(const[u,f,d]of h){const p=Gc(a,t.shape==="truck"||t.shape==="cyber"?.34:.28,e?10:18,t.accent);p.pivot.position.set(u,a,f),i.add(p.pivot),n.push({...p,front:d})}return n}function kc(i,t,e,n,s,r){const{width:a,accent:o}=t,l=new K(new Ut(a*.62,.055,.05),No);l.position.set(0,s,e),i.add(l),mn||(mn=ii()),An(i,mn,14677759,a*.5,new P(0,s,e+.06),.4);const c=new K(new Ut(a*.68,.055,.045),Qh.clone());return c.position.set(0,r,n),c.userData.isTail=!0,i.add(c),An(i,mn,16717880,a*.5,new P(0,r,n-.05),.34),An(i,mn,o,a*.32,new P(0,r-.05,n-.04),.2),c}function ol(i,{ai:t=!1,showcase:e=!1}={}){mn||(mn=ii());const n=new Re;n.name=`vehicle-${i.id}`;const{width:s,length:r,wheelRadius:a,rideHeight:o,shape:l}=i,c=new il({color:i.color,metalness:i.id==="cyber"?.8:.52,roughness:i.id==="cyber"?.32:.3,clearcoat:1,clearcoatRoughness:i.id==="cyber"?.28:.1,emissive:i.color,emissiveIntensity:.045}),h=new Nt({color:i.accent,emissive:i.accent,emissiveIntensity:.75,roughness:.3,metalness:.6});let u=.62+o*.4;if(l==="bike"){const p=Ae(.22,.3,1.5,.08,c);p.position.y=.72,n.add(p);const _=Ae(.34,.4,.56,.1,on);_.position.set(0,.8,-.12),n.add(_);const m=Ae(.4,.36,.68,.16,c);m.position.set(0,1,.1),n.add(m);const g=Ae(.13,.045,.6,.02,on);g.position.set(0,1.18,.1),n.add(g);const v=Ae(.29,.13,.6,.06,on);v.position.set(0,1.04,-.5),n.add(v);const b=Ae(.28,.2,.42,.09,c);b.position.set(0,1,-.93),n.add(b);const S=Ae(.16,.1,.16,.04,c);S.position.set(0,1.05,-1.15),n.add(S);const T=new Nt({color:13094616,metalness:.95,roughness:.16});for(const F of[-.1,.1]){const L=new K(new Ie(.035,.045,.85,8),T);L.position.set(F,.62,.82),L.rotation.x=-.26,n.add(L)}const w=new K(new Ie(.028,.028,.68,8),on);w.rotation.z=Math.PI/2,w.position.set(0,1.18,.7),n.add(w);const x=new K(new Ut(.32,.2,.03),Ga);x.position.set(0,1.24,.82),x.rotation.x=-.5,n.add(x);const M=Ae(.38,.3,.36,.12,c);M.position.set(0,1.02,.86),n.add(M);const C=new K(new Pn(.11,12,8),No);C.position.set(0,.98,1.02),n.add(C),An(n,mn,16777215,.55,new P(0,.98,1.07),.5);const A=new K(new Ut(.24,.08,.04),Qh.clone());A.position.set(0,1,-1.24),A.userData.isTail=!0,n.add(A),An(n,mn,16717880,.42,new P(0,1,-1.27),.4);const I=new K(new Ut(.36,.03,.5),h);I.position.set(0,.79,-.06),n.add(I);const N=new Nt({color:1514018,metalness:.55,roughness:.38});for(const F of[i.wheelbase/2,-i.wheelbase/2]){const L=new K(new ei(a+.06,.045,4,12,Math.PI*.9),N);L.rotation.y=Math.PI/2,L.rotation.z=-.05,L.scale.z=2.4,L.position.set(0,a+.02,F),n.add(L)}}else if(l==="cyber"){const p=Ae(s,.66,r,.08,c);p.position.y=.68+o*.3,n.add(p);const _=c_(s*.97,.72,r*.92,r*.4,c,-.32);_.position.y=1+o*.28,n.add(_);const m=Ae(s*.9,.2,r*.36,.04,Ga);m.position.set(0,1.52+o*.2,.1),m.rotation.x=-.22,n.add(m);const g=Ae(s*.8,.13,r*.3,.03,on);g.position.set(0,1.33,-1.84),n.add(g);const v=Ae(s*1.01,.2,.24,.03,on);v.position.set(0,.52,r/2-.02),n.add(v);const b=new K(new Ut(s*.78,.035,.04),No);b.position.set(0,.92,r/2-.03),n.add(b),An(n,mn,15268095,s*.55,new P(0,.92,r/2),.45),kc(n,i,r/2,-r/2,1.32,.9);for(const S of[-1,1])for(const T of[i.wheelbase/2,-i.wheelbase/2]){const w=Ae(.16,.1,1.28,.04,on);w.position.set(S*(s/2-.02),a+.5,T),n.add(w)}}else{const p=l==="suv"||l==="truck"?1:0,_=.56+p*.18,m=Ae(s,_,r*.94,l==="hyper"?.24:.18,c);m.position.y=u,n.add(m);const g=Ae(s*.93,.22+p*.08,r*.22,.1,c);g.position.set(0,.7+p*.12,r*.36),n.add(g);const v=Ae(s*.92,.26+p*.1,r*.18,.1,c);v.position.set(0,.72+p*.12,-r*.39),n.add(v);const b=r*(l==="hyper"||l==="compact"?.46:.44),S=l==="hyper"?.33:l==="suv"?.58:l==="truck"?.52:.47,T=s*(l==="hyper"?.7:.78),w=h_(T,S,b,l==="hyper"?.32:.27,l==="hyper"?.3:.24,Ga);w.position.set(0,u+_/2-.02,-r*(l==="compact"?.02:.07)),n.add(w);const x=Ae(T*.94,.05,b*.44,.02,c);x.position.set(0,w.position.y+S+.005,w.position.z-b*.055),n.add(x);for(const N of[-1,1]){const F=new K(new Ut(.035,S*.94,.16),c);F.position.set(N*(T/2-.01),w.position.y+S/2,w.position.z-b*.27),n.add(F)}if(l==="suv"||l==="truck"){const N=new Nt({color:2764086,metalness:.8,roughness:.35});for(const F of[-.65,.65]){const L=new K(new Ut(.05,.05,b*.8),N);L.position.set(F,x.position.y+.06,x.position.z),n.add(L)}}const M=Ae(s*1.01,.16,r*.6,.05,on);M.position.y=.41+o*.2,n.add(M);const C=Ae(s*1.01,.22,.24,.05,on);C.position.set(0,.52,r/2-.04),n.add(C);const A=Ae(s*1.01,.22,.2,.05,on);A.position.set(0,.52,-r/2+.04),n.add(A);const I=kc(n,i,r/2+.005,-r/2-.005,.78+p*.2,.78+p*.2);if(l!=="compact")for(const N of[-1,1]){const F=new K(new Ut(.025,.045,r*.44),h);F.position.set(N*(s/2+.005),.63+p*.2,-.2),n.add(F)}for(const N of[-1,1]){const F=Ae(.15,.09,.25,.03,c);F.position.set(N*(s/2+.1),w.position.y-.02,w.position.z+b*.38),n.add(F)}if(l==="hyper"){const N=Ae(s*.82,.05,.3,.02,on);N.position.set(0,1.03,-r*.43),n.add(N);for(const F of[-.6,.6]){const L=new K(new Ut(.04,.2,.1),on);L.position.set(F,.9,-r*.42),n.add(L)}}if(l==="truck"){const N=Ae(s*.86,.14,r*.34,.04,on);N.position.set(0,1.38,-r*.3),n.add(N);for(const F of[-.72,.72]){const L=Ae(.08,.24,r*.34,.02,c);L.position.set(F,1.48,-r*.3),n.add(L)}}if(i.id==="apex"){const N=new Nt({color:15265268,metalness:.35,roughness:.4});for(const X of[-1,1]){const G=Ae(.03,.34,1.45,.01,N);G.position.set(X*(s/2+.012),.69,-.06),n.add(G)}const F=new K(new Ut(1.24,.1,.24),new he({color:1319226}));F.position.set(0,x.position.y+.12,x.position.z),n.add(F);const L=new K(new Ut(.5,.11,.18),new he({color:16719920,toneMapped:!1}));L.position.set(-.33,x.position.y+.2,x.position.z),n.add(L);const z=new K(new Ut(.5,.11,.18),new he({color:2126079,toneMapped:!1}));z.position.set(.33,x.position.y+.2,x.position.z),n.add(z),n.userData.policeLights=[L,z],An(n,mn,16724032,1.2,new P(-.33,x.position.y+.24,x.position.z),.5),An(n,mn,3178751,1.2,new P(.33,x.position.y+.24,x.position.z),.5)}n.userData.rearLight=I}const f=u_(n,i,t);if(l!=="bike"){const p=new Nt({color:1514018,metalness:.55,roughness:.38});for(const _ of[-1,1])for(const m of[i.wheelbase/2,-i.wheelbase/2]){const g=new K(new ei(a+.1,.055,4,12,Math.PI),p);g.rotation.y=Math.PI/2,g.position.set(_*(s/2+.015),a+.01,m),n.add(g)}}if(!t){const p=new K(new Ze(s*1.3,r*1.02),new he({map:mn,color:i.accent,transparent:!0,opacity:.34,blending:zn,depthWrite:!1,toneMapped:!1}));p.rotation.x=-Math.PI/2,p.position.y=.055,p.renderOrder=3,n.add(p)}Kh(n,Math.max(s,r)*.66,.9,.035);const d={group:n,type:i,wheels:f,width:s,length:r,wheelRadius:a,rideHeight:o,collisionRadius:Math.max(s*.62,.6),label:null,headlights:[]};return n.userData.vehicle=d,d}const ka=new Map;function f_(i){const t=i.type;ka.has(t.id)||ka.set(t.id,zx(t.name,t.className,`#${t.accent.toString(16).padStart(6,"0")}`));const e=new ti({map:ka.get(t.id),transparent:!0,depthWrite:!1,toneMapped:!1}),n=new _i(e);return n.scale.set(4.5,1.125,1),n.position.set(0,t.shape==="bike"?2.1:t.shape==="cyber"?2.55:2.35,0),n.userData.baseY=n.position.y,i.group.add(n),i.label=n,n}function na(i,t,e,n,s=!1,r=0){for(const l of i.wheels)l.front&&(l.pivot.rotation.y=e),l.spin.rotation.x-=t*n/Math.max(.2,i.wheelRadius);const a=i.group.userData.rearLight;a&&a.material&&(a.material.color.setHex(s?16734794:16717880),a.scale.y=s?1.5:1);const o=i.group.userData.policeLights;if(o){const l=Math.floor(r*6)%2;o[0].visible=l===0,o[1].visible=l===1}i.label&&(i.label.position.y=i.label.userData.baseY+Math.sin(r*1.6)*.06)}const Hc=[9395262,7029292,12947307,5058338,14725260,10250826],Vc=[2898775,3159626,4082272,2502719,4869980],Wc=[3107663,3621461,7089986,11831877,3036780,8084029,4538703];function Ts(i,t,e,n,s=.06){return new K(new ea(t,e,n,2,Math.min(s,e/2.1)),i)}function jh({player:i=!1,hoodie:t=3107663,pants:e=2898775,skin:n=9395262,cap:s=!0,capColor:r=1382944}={}){const a=new Re;a.name=i?"player":"pedestrian";const o=new Nt({color:n,roughness:.72,metalness:0}),l=new Nt({color:t,roughness:.82,metalness:.02}),c=new Nt({color:e,roughness:.9,metalness:.01}),h=new Nt({color:i?15328472:2368812,roughness:.6,metalness:.08}),u=new Nt({color:r,roughness:.76}),f=new Nt({color:16762967,metalness:.9,roughness:.25}),d=new Re;d.position.y=.92,a.add(d);const p=Ts(l,.5,.62,.29,.14);if(p.position.y=.36,d.add(p),i){const T=Ts(l,.34,.2,.2,.08);T.position.set(0,.52,-.18),d.add(T);const w=new K(new ei(.12,.014,5,12,Math.PI*.9),f);w.position.set(0,.52,.16),w.rotation.x=Math.PI/2,w.rotation.z=Math.PI,d.add(w)}const _=new K(new Ie(.07,.08,.1,8),o);_.position.y=.69,d.add(_);const m=new K(new Pn(.15,14,10),o);if(m.scale.set(.95,1.05,.92),m.position.y=.84,d.add(m),s){const T=new K(new Pn(.158,14,8,0,Math.PI*2,0,Math.PI*.55),u);T.position.y=.885,T.scale.y=.8,d.add(T);const w=new K(new Ut(.26,.025,.17),u);w.position.set(0,.875,.15),w.rotation.x=.08,d.add(w)}else{const T=new K(new Pn(.153,12,8,0,Math.PI*2,0,Math.PI*.5),u);T.position.y=.86,d.add(T)}const g=new Re;g.position.y=.55,d.add(g);const v=[];for(const T of[-1,1]){const w=new Re;w.position.set(T*.32,0,0);const x=Ts(l,.15,.5,.16,.07);x.position.y=-.24,w.add(x);const M=new K(new Pn(.075,8,6),o);if(M.position.y=-.5,w.add(M),i){const C=new K(new Ut(.16,.08,.17),new Nt({color:15262938,roughness:.8}));C.position.y=-.3,w.add(C)}g.add(w),v.push(w)}const b=[];for(const T of[-1,1]){const w=new Re;w.position.set(T*.13,-.02,0);const x=Ts(c,.2,.62,.22,.08);x.position.y=-.34,w.add(x);const M=Ts(h,.22,.12,.36,.05);M.position.set(0,-.66,.05),w.add(M),d.add(w),b.push(w)}Kh(a,i?1.15:.95,.7,.03);const S={root:a,hips:d,torso:p,head:m,arms:v,legs:b,player:i,phase:Math.random()*10,riding:!1,dead:!1,materials:{hoodieMat:l,pantsMat:c,skinMat:o}};return a.userData.character=S,S}function Pi(i,t,e,{riding:n=!1,t:s=0}={}){if(i.dead){i.hips.rotation.z=xf.lerp(i.hips.rotation.z,Math.PI/2,.15),i.root.position.y=.3;return}if(n){i.arms[0].rotation.x=-1.15,i.arms[1].rotation.x=-1.15,i.arms[0].rotation.z=.15,i.arms[1].rotation.z=-.15,i.legs[0].rotation.x=-1.05,i.legs[0].rotation.z=.25,i.legs[1].rotation.x=-1.05,i.legs[1].rotation.z=-.25,i.torso.rotation.x=.22;return}const r=t>.25;i.phase+=e*(r?t*2.1:1.1);const a=r?Math.min(.85,.28+t*.1):.035,o=Math.sin(i.phase*2)*a;i.legs[0].rotation.x=o,i.legs[1].rotation.x=-o,i.arms[0].rotation.x=-o*.85,i.arms[1].rotation.x=o*.85,i.arms[0].rotation.z=.04,i.arms[1].rotation.z=-.04,i.legs.forEach(l=>{l.rotation.z=0}),i.torso.rotation.x=r?.09+Math.min(.1,t*.02):Math.sin(s*1.2)*.014,i.torso.rotation.z=r?Math.sin(i.phase*2)*.035:0,i.hips.position.y=.92+(r?Math.abs(Math.sin(i.phase*2))*.035:Math.sin(s*1.4)*.008)}function d_(i=0,t={}){const e=t.skin??Hc[i%Hc.length],n=t.hoodie??Wc[(i*3+1)%Wc.length],s=t.pants??Vc[(i*5+2)%Vc.length];return jh({skin:e,hoodie:n,pants:s,cap:i%3!==0,capColor:i%2?1777188:5978667})}const Vt=i=>document.getElementById(i),p_=[{name:"NEON DISTRICT",test:(i,t)=>t>30&&t<150&&Math.abs(i)<60},{name:"DOWNTOWN LOS SANTOS",test:(i,t)=>t<30&&t>-150&&i<60},{name:"VINEWOOD HILLS",test:(i,t)=>t<-100},{name:"DEL PERRO BEACH",test:(i,t)=>t>150&&t<232},{name:"EAST LOS SANTOS",test:i=>i>90},{name:"WEST LOS SANTOS",test:i=>i<-90},{name:"SAN ANDREAS FREEWAY",test:()=>!0}];class m_{constructor(){this.el={hud:Vt("hud"),title:Vt("title"),play:Vt("play-btn"),minimap:Vt("minimap"),cash:Vt("cash"),clock:Vt("clock"),district:Vt("district-name"),wanted:[...document.querySelectorAll("#wanted .star")],missionCard:Vt("mission-card"),missionTitle:Vt("mission-title"),missionTarget:Vt("mission-target"),missionTimer:Vt("mission-timer"),missionDistance:Vt("mission-distance"),missionProgress:Vt("mission-progress"),healthBar:Vt("health-bar"),healthValue:Vt("health-value"),armorBar:Vt("armor-bar"),armorValue:Vt("armor-value"),vehiclePanel:Vt("vehicle-panel"),vBrand:Vt("v-brand"),vName:Vt("v-name"),speed:Vt("speed"),gear:Vt("gear"),vClass:Vt("v-class"),vMode:Vt("v-mode"),batteryBar:Vt("battery-bar"),batteryValue:Vt("battery-value"),interact:Vt("interact"),interactText:Vt("interact-text"),toastStack:Vt("toast-stack"),vehicleCard:Vt("vehicle-card"),vcName:Vt("vc-name"),vcSub:Vt("vc-sub"),vcSpeed:Vt("vc-speed"),vcAccel:Vt("vc-accel"),vcHandling:Vt("vc-handling"),mute:Vt("mute-btn"),touchAction:Vt("touch-action"),touchGas:Vt("touch-gas"),touchBrake:Vt("touch-brake"),touchBoost:Vt("touch-boost"),touchHandbrake:Vt("touch-handbrake"),joystick:Vt("joystick"),stick:document.querySelector("#joystick .stick"),loading:Vt("loading"),flash:Vt("flash"),busted:Vt("busted"),wasted:Vt("wasted"),cinematic:Vt("cinematic"),cineTitle:Vt("cine-title"),cineSub:Vt("cine-sub")},this.cache={},this.touch={x:0,y:0,gas:!1,brake:!1,boost:!1,handbrake:!1},this.onAction=null,this.onMute=null,this.onPlay=null,this.missionDistance=0,this.mapCanvas=document.createElement("canvas"),this.mapCanvas.width=512,this.mapCanvas.height=512,this.mapCtx=this.mapCanvas.getContext("2d"),this.mapReady=!1,this.timeouts=new Set,this.setup()}setup(){document.body.classList.add("title-mode"),this.el.play.addEventListener("click",()=>{this.playing||(this.playing=!0,this.el.title.classList.add("gone"),document.body.classList.remove("title-mode"),document.body.classList.add("playing"),this.onPlay?.())}),this.el.mute.addEventListener("click",e=>{e.stopPropagation();const n=document.body.classList.toggle("muted");this.el.mute.textContent=n?"×":"♪",this.onMute?.(n)});const t=window.matchMedia("(pointer: coarse)").matches||"ontouchstart"in window;this.isTouch=t,document.body.classList.toggle("touch",t),this.setupTouch()}setupTouch(){const t=this.el.stick,e=this.el.joystick;let n=null;const s=(l,c)=>{const u=Math.hypot(l,c),f=u>40?40/u:1,d=l*f,p=c*f;t.style.transform=`translate(${d}px, ${p}px)`,this.touch.x=d/40,this.touch.y=p/40},r=l=>{if(!n)return;const c=e.getBoundingClientRect();s(l.clientX-(c.left+c.width/2),l.clientY-(c.top+c.height/2))},a=()=>{n=null,t.style.transform="translate(0px, 0px)",this.touch.x=0,this.touch.y=0};e.addEventListener("pointerdown",l=>{n=l.pointerId,e.setPointerCapture?.(l.pointerId),r(l),l.preventDefault()}),e.addEventListener("pointermove",r),e.addEventListener("pointerup",a),e.addEventListener("pointercancel",a);const o=(l,c)=>{const h=f=>{f.preventDefault(),this.touch[c]=!0,l.classList.add("held")},u=f=>{f?.preventDefault?.(),this.touch[c]=!1,l.classList.remove("held")};l.addEventListener("pointerdown",h),l.addEventListener("pointerup",u),l.addEventListener("pointercancel",u),l.addEventListener("pointerleave",u)};o(this.el.touchGas,"gas"),o(this.el.touchBrake,"brake"),o(this.el.touchBoost,"boost"),o(this.el.touchHandbrake,"handbrake"),this.el.touchAction.addEventListener("pointerdown",l=>{l.preventDefault(),this.onAction?.()})}ready(){this.el.loading.classList.add("gone")}buildMap(t){const e=this.mapCtx,n=512,s=560,r=280,a=n/s,o=h=>(h+r)*a,l=h=>(h+r)*a;e.clearRect(0,0,n,n),e.fillStyle="#182a38",e.fillRect(0,0,n,n),e.fillStyle="#38343c",e.fillRect(0,0,n,l(232)),e.fillStyle="#2f3a36",e.fillRect(0,0,n,l(-168)),e.fillStyle="#a98d66",e.fillRect(0,l(168),n,l(232)-l(168));const c=e.createLinearGradient(0,l(232),0,n);c.addColorStop(0,"#2b6070"),c.addColorStop(1,"#172b3f"),e.fillStyle=c,e.fillRect(0,l(232),n,n-l(232)),e.fillStyle="#23232d",e.fillRect(o(-168),l(-168),o(168)-o(-168),l(168)-l(-168));for(const h of t.blockTypes){const u=o(h.x-Wt.blockSize/2),f=l(h.z-Wt.blockSize/2),d=Wt.blockSize*a;if(h.type==="park"?e.fillStyle="#36523f":h.type==="parking"?e.fillStyle="#383946":h.type==="plaza"?e.fillStyle="#4b4156":e.fillStyle="#54505d",e.fillRect(u,f,d,d),h.type==="buildings"||h.type==="landmark"){e.fillStyle="#6a6473";const p=7*a;e.fillRect(u+p,f+p,d-p*2,d-p*2),e.fillStyle="rgba(255,255,255,0.08)",e.fillRect(u+p,f+p,(d-p*2)*.28,(d-p*2)*.28)}h.type==="plaza"&&(e.fillStyle="#ff5f9d",e.fillRect(o(-16),l(56),32*a,2))}e.strokeStyle="#1a1b23",e.lineWidth=Wt.road*a;for(const h of Wt.roadCenters)e.beginPath(),e.moveTo(o(-168),l(h)),e.lineTo(o(168),l(h)),e.stroke(),e.beginPath(),e.moveTo(o(h),l(-168)),e.lineTo(o(h),l(168)),e.stroke();e.strokeStyle="rgba(210,200,170,0.35)",e.lineWidth=.8;for(const h of Wt.roadCenters)e.beginPath(),e.moveTo(o(-168),l(h)),e.lineTo(o(168),l(h)),e.stroke(),e.beginPath(),e.moveTo(o(h),l(-168)),e.lineTo(o(h),l(168)),e.stroke();e.strokeStyle="rgba(180,240,255,0.5)",e.lineWidth=1.4,e.beginPath(),e.moveTo(0,l(232)),e.lineTo(n,l(232)),e.stroke(),e.fillStyle="#5d4430",e.fillRect(o(-83),l(230),10*a,42*a),this.mapScale=a,this.mapReady=!0}setText(t,e){if(this.cache[t]===e)return;this.cache[t]=e;const n=this.el[t]||document.getElementById(t);n&&(n.textContent=e)}setPlaying(t){this.playing=t,document.body.classList.toggle("playing",t),document.body.classList.toggle("title-mode",!t),t?this.el.title.classList.add("gone"):this.el.title.classList.remove("gone")}update(t){if(!this.playing)return;const e=t;this.setText("speed",String(Math.round(Math.abs(e.speedKmh||0)))),this.setText("gear",e.gear||"N"),this.setText("cash",(e.cash??0).toLocaleString("en-US")),this.setText("clock",e.clock||"19:42"),this.setText("district",e.district||"LOS SANTOS");const n=xe(Math.round(e.health??100),0,100),s=xe(Math.round(e.armor??0),0,100);this.cache.hp!==n&&(this.cache.hp=n,this.el.healthBar.style.width=`${n}%`,this.el.healthValue.textContent=n),this.cache.armor!==s&&(this.cache.armor=s,this.el.armorBar.style.width=`${s}%`,this.el.armorValue.textContent=s);const r=e.wanted||0;if(this.cache.wanted!==r&&(this.cache.wanted=r,this.el.wanted.forEach((a,o)=>a.classList.toggle("on",o<r))),e.vehicle){this.el.vehiclePanel.classList.remove("hidden");const a=e.vehicle;this.setText("vBrand",a.brand),this.setText("vName",a.name),this.setText("vClass",a.className),this.setText("vMode",a.drivetrain);const o=xe(Math.round(e.battery??100),0,100);this.cache.batt!==o&&(this.cache.batt=o,this.el.batteryBar.style.transform=`scaleX(${o/100})`,this.el.batteryValue.textContent=`${o}%`),this.el.vehiclePanel.style.borderRightColor=`#${a.accent.toString(16).padStart(6,"0")}`}else this.el.vehiclePanel.classList.add("hidden");if(e.prompt?(this.el.interact.classList.add("show"),this.setText("interactText",e.prompt),this.isTouch&&(this.el.touchAction.textContent=e.prompt.includes("EXIT")?"↩":"E")):this.el.interact.classList.remove("show"),e.mission){this.el.missionCard.classList.remove("hidden"),this.setText("missionTitle",e.mission.title),this.setText("missionTarget",e.mission.target),this.setText("missionTimer",e.mission.timerText),this.setText("missionDistance",e.mission.distanceText);const a=xe(e.mission.progress,0,1);this.el.missionProgress.style.width=`${Math.max(2,a*100)}%`}else this.el.missionCard.classList.add("hidden");this.drawMinimap(e)}drawMinimap(t){if(!this.mapReady)return;const e=this.el.minimap,n=e.getContext("2d"),s=e.width,r=s/2,a=2.05;n.save(),n.clearRect(0,0,s,s),n.beginPath(),n.arc(r,r,r-2,0,Math.PI*2),n.clip(),n.fillStyle="#111722",n.fillRect(0,0,s,s);const o=(t.player.x+280)*this.mapScale,l=(t.player.z+280)*this.mapScale;n.translate(r,r),n.rotate(Math.PI-(t.player.heading||0)),n.scale(a,a),n.drawImage(this.mapCanvas,-o,-l);const c=(h,u,f,d=3.4,p=!1)=>{const _=(h+280)*this.mapScale-o,m=(u+280)*this.mapScale-l;p&&(n.shadowColor=f,n.shadowBlur=12),n.fillStyle=f,n.beginPath(),n.arc(_,m,d,0,Math.PI*2),n.fill(),n.shadowBlur=0};if(t.markers?.shards)for(const h of t.markers.shards)c(h.x,h.z,"#66f4ff",2.2);if(t.markers?.traffic)for(const h of t.markers.traffic)c(h.x,h.z,h.police?"#ff4f6a":"rgba(255,255,255,0.5)",h.police?3.2:2.3);if(t.markers?.mission){const h=(t.markers.mission.x+280)*this.mapScale-o,u=(t.markers.mission.z+280)*this.mapScale-l;n.save(),n.translate(h,u),n.rotate(-(Math.PI-(t.player.heading||0))),n.fillStyle="#ffc857",n.shadowColor="#ffc857",n.shadowBlur=10,n.beginPath(),n.moveTo(0,-7),n.lineTo(6,0),n.lineTo(0,7),n.lineTo(-6,0),n.closePath(),n.fill(),n.restore()}n.restore(),n.save(),n.translate(r,r),n.fillStyle="#ffffff",n.shadowColor="#66f4ff",n.shadowBlur=12,n.beginPath(),n.moveTo(0,-9),n.lineTo(6.5,7),n.lineTo(0,3.8),n.lineTo(-6.5,7),n.closePath(),n.fill(),n.restore()}setPrompt(t){this._prompt=t}toast(t,e="",n=2600){const s=document.createElement("div");for(s.className=`toast ${e}`,s.textContent=t,this.el.toastStack.appendChild(s);this.el.toastStack.children.length>4;)this.el.toastStack.firstChild.remove();const r=setTimeout(()=>{s.classList.add("out");const a=setTimeout(()=>s.remove(),340);this.timeouts.add(a)},n);this.timeouts.add(r)}showVehicleCard(t){const e=t.type;this.el.vcName.textContent=e.name,this.el.vcSub.textContent=`${e.brand} · ${e.className}`,this.el.vcSpeed.textContent=e.spec.top,this.el.vcAccel.textContent=e.spec.accel.toFixed(1),this.el.vcHandling.textContent=e.spec.handling,this.el.vehicleCard.classList.add("show"),clearTimeout(this._cardTimeout),this._cardTimeout=setTimeout(()=>this.el.vehicleCard.classList.remove("show"),3800)}showEnd(t){this.el.busted.classList.toggle("show",t==="busted"),this.el.wasted.classList.toggle("show",t==="wasted")}hideEnd(){this.el.busted.classList.remove("show"),this.el.wasted.classList.remove("show")}flash(){this.el.flash.classList.remove("go"),this.el.flash.offsetWidth,this.el.flash.classList.add("go")}showCinematic(t,e,n=2400){this.el.cineTitle.textContent=t,this.el.cineSub.textContent=e,this.el.cinematic.classList.add("show"),clearTimeout(this._cineTimeout),this._cineTimeout=setTimeout(()=>this.el.cinematic.classList.remove("show"),n)}districtFor(t,e){for(const n of p_)if(n.test(t,e))return n.name;return"LOS SANTOS"}}const Rr=i=>440*Math.pow(2,(i-69)/12);class g_{constructor(){this.ctx=null,this.muted=!1,this.started=!1,this.driving=!1,this.sirenOn=!1,this.nextNoteTime=0,this.step=0,this.timer=null,this.tempo=94,this.speed=0,this.throttle=0}init(){if(!this.ctx)try{const t=window.AudioContext||window.webkitAudioContext;if(!t)return;this.ctx=new t;const e=this.ctx;this.master=e.createGain(),this.master.gain.value=.62,this.compressor=e.createDynamicsCompressor(),this.compressor.threshold.value=-18,this.compressor.knee.value=22,this.compressor.ratio.value=6,this.master.connect(this.compressor),this.compressor.connect(e.destination),this.musicGain=e.createGain(),this.musicGain.gain.value=.22,this.musicGain.connect(this.master),this.sfxGain=e.createGain(),this.sfxGain.gain.value=.5,this.sfxGain.connect(this.master),this.engineGain=e.createGain(),this.engineGain.gain.value=0,this.engineGain.connect(this.master),this.delay=e.createDelay(1),this.delay.delayTime.value=.34,this.delayFeedback=e.createGain(),this.delayFeedback.gain.value=.34,this.delay.connect(this.delayFeedback),this.delayFeedback.connect(this.delay);const n=e.createGain();n.gain.value=.2,this.delay.connect(n),n.connect(this.musicGain),this.noiseBuffer=this.makeNoise(2),this.startEngine(),this.startMusic(),this.started=!0,this.applyMute(),e.resume?.()}catch(t){console.warn("audio unavailable",t)}}makeNoise(t=1){const e=this.ctx,n=e.createBuffer(1,Math.floor(e.sampleRate*t),e.sampleRate),s=n.getChannelData(0);for(let r=0;r<s.length;r++)s[r]=Math.random()*2-1;return n}startEngine(){const t=this.ctx;this.engineFilter=t.createBiquadFilter(),this.engineFilter.type="lowpass",this.engineFilter.frequency.value=280,this.engineFilter.Q.value=2.2,this.engineFilter.connect(this.engineGain),this.engineOscA=t.createOscillator(),this.engineOscA.type="sawtooth",this.engineOscA.frequency.value=42;const e=t.createGain();e.gain.value=.12,this.engineOscA.connect(e),e.connect(this.engineFilter),this.engineOscA.start(),this.engineOscB=t.createOscillator(),this.engineOscB.type="square",this.engineOscB.frequency.value=86;const n=t.createGain();n.gain.value=.035,this.engineOscB.connect(n),n.connect(this.engineFilter),this.engineOscB.start(),this.whine=t.createOscillator(),this.whine.type="sine",this.whine.frequency.value=640;const s=t.createGain();s.gain.value=.025,this.whine.connect(s),s.connect(this.engineGain),this.whine.start();const r=t.createBufferSource();r.buffer=this.noiseBuffer,r.loop=!0,this.tireFilter=t.createBiquadFilter(),this.tireFilter.type="bandpass",this.tireFilter.frequency.value=1800,this.tireFilter.Q.value=1.4,this.tireGain=t.createGain(),this.tireGain.gain.value=0,r.connect(this.tireFilter),this.tireFilter.connect(this.tireGain),this.tireGain.connect(this.master),r.start()}updateEngine({driving:t,speed:e,throttle:n,braking:s,boosting:r,drifting:a}){if(!this.ctx)return;const o=this.ctx.currentTime,l=t?.15+Math.abs(n)*.12:0;this.engineGain.gain.setTargetAtTime(l,o,.08);const c=Math.abs(e),h=38+Math.min(c,90)*2.4;this.engineOscA.frequency.setTargetAtTime(h,o,.05),this.engineOscB.frequency.setTargetAtTime(h*2.03,o,.05),this.whine.frequency.setTargetAtTime(520+c*26,o,.05),this.engineFilter.frequency.setTargetAtTime(180+c*20+Math.abs(n)*140,o,.08);const u=t&&a&&c>8?Math.min(.1,c*.0018):0;this.tireGain.gain.setTargetAtTime(u,o,.06),this.engineGain.gain.setTargetAtTime(l+(r?.035:0),o,.08)}startMusic(){const t=this.ctx;this.nextNoteTime=t.currentTime+.1,this.timer=setInterval(()=>this.scheduler(),60)}scheduler(){if(!this.ctx)return;const t=.16;for(;this.nextNoteTime<this.ctx.currentTime+t;)this.scheduleStep(this.step,this.nextNoteTime),this.nextNoteTime+=60/this.tempo/4,this.step++,this.step>=64&&(this.step=0)}scheduleStep(t,e){this.ctx;const n=Math.floor(t/16)%4,s=[[57,60,64,69],[53,57,60,65],[48,55,60,64],[55,59,62,67]],r=[33,29,36,31],a=s[n];if(t%16===0)for(const o of a.slice(0,3))this.pad(Rr(o-12),e,4.2,.024);if(t%4===0&&this.pluck(Rr(r[n]),e,.4,.07,"sawtooth",280),t%8===4&&this.pluck(Rr(r[n]+12),e,.18,.035,"triangle",420),t%2===0){const l=a[[0,2,1,3,2,1,3,0][t/2%8]];this.pluck(Rr(l+12),e,.13,.03,"triangle",1800,this.delay)}t%2===1&&this.hat(e,t%4===3?.035:.018),t%4===0&&this.kick(e),(t%16===4||t%16===12)&&this.hat(e,.05,1300)}pad(t,e,n,s){const r=this.ctx,a=r.createOscillator();a.type="sawtooth",a.frequency.value=t;const o=r.createBiquadFilter();o.type="lowpass",o.frequency.value=1100,o.Q.value=.6;const l=r.createGain();l.gain.setValueAtTime(1e-4,e),l.gain.linearRampToValueAtTime(s,e+.5),l.gain.linearRampToValueAtTime(s*.7,e+n*.7),l.gain.exponentialRampToValueAtTime(1e-4,e+n),a.connect(o),o.connect(l),l.connect(this.musicGain),a.start(e),a.stop(e+n+.05)}pluck(t,e,n,s,r="triangle",a=2e3,o=null){const l=this.ctx,c=l.createOscillator();c.type=r,c.frequency.value=t;const h=l.createBiquadFilter();h.type="lowpass",h.frequency.value=a;const u=l.createGain();u.gain.setValueAtTime(1e-4,e),u.gain.linearRampToValueAtTime(s,e+.008),u.gain.exponentialRampToValueAtTime(1e-4,e+n),c.connect(h),h.connect(u),u.connect(this.musicGain),o&&u.connect(o),c.start(e),c.stop(e+n+.02)}kick(t){const e=this.ctx,n=e.createOscillator();n.type="sine",n.frequency.setValueAtTime(130,t),n.frequency.exponentialRampToValueAtTime(42,t+.14);const s=e.createGain();s.gain.setValueAtTime(.14,t),s.gain.exponentialRampToValueAtTime(1e-4,t+.3),n.connect(s),s.connect(this.musicGain),n.start(t),n.stop(t+.32)}hat(t,e=.02,n=6500){const s=this.ctx,r=s.createBufferSource();r.buffer=this.noiseBuffer;const a=s.createBiquadFilter();a.type="highpass",a.frequency.value=n;const o=s.createGain();o.gain.setValueAtTime(e,t),o.gain.exponentialRampToValueAtTime(1e-4,t+.055),r.connect(a),a.connect(o),o.connect(this.musicGain),r.start(t),r.stop(t+.08)}blip(t=660,e=.1,n=.06,s="sine"){if(!this.ctx)return;const r=this.ctx,a=r.currentTime,o=r.createOscillator();o.type=s,o.frequency.setValueAtTime(t,a);const l=r.createGain();l.gain.setValueAtTime(1e-4,a),l.gain.linearRampToValueAtTime(n,a+.01),l.gain.exponentialRampToValueAtTime(1e-4,a+e),o.connect(l),l.connect(this.sfxGain),o.start(a),o.stop(a+e+.02)}chime(){this.blip(880,.16,.055),setTimeout(()=>this.blip(1320,.22,.05),80)}cash(){this.blip(990,.09,.05),setTimeout(()=>this.blip(1480,.13,.045),65),setTimeout(()=>this.blip(1760,.2,.04),140)}enterCar(){this.blip(180,.2,.07,"sawtooth"),setTimeout(()=>this.blip(420,.15,.04),60)}crash(t=1){if(!this.ctx)return;const e=this.ctx,n=e.currentTime,s=e.createBufferSource();s.buffer=this.noiseBuffer;const r=e.createBiquadFilter();r.type="lowpass",r.frequency.setValueAtTime(1500,n),r.frequency.exponentialRampToValueAtTime(180,n+.3);const a=e.createGain();a.gain.setValueAtTime(.18*Math.min(1.6,t),n),a.gain.exponentialRampToValueAtTime(1e-4,n+.4),s.connect(r),r.connect(a),a.connect(this.sfxGain),s.start(n),s.stop(n+.42);const o=e.createOscillator();o.type="sine",o.frequency.setValueAtTime(90,n),o.frequency.exponentialRampToValueAtTime(36,n+.25);const l=e.createGain();l.gain.setValueAtTime(.14,n),l.gain.exponentialRampToValueAtTime(1e-4,n+.3),o.connect(l),l.connect(this.sfxGain),o.start(n),o.stop(n+.32)}horn(){if(!this.ctx)return;const t=this.ctx,e=t.currentTime;for(const n of[392,494]){const s=t.createOscillator();s.type="square",s.frequency.value=n;const r=t.createGain();r.gain.setValueAtTime(1e-4,e),r.gain.linearRampToValueAtTime(.035,e+.02),r.gain.setValueAtTime(.035,e+.17),r.gain.exponentialRampToValueAtTime(1e-4,e+.28),s.connect(r),r.connect(this.sfxGain),s.start(e),s.stop(e+.3)}}setMuted(t){this.muted=t,this.applyMute()}applyMute(){this.ctx&&this.master.gain.setTargetAtTime(this.muted?0:.62,this.ctx.currentTime,.05)}setSiren(t){if(this.ctx){if(t&&!this.sirenOn){this.sirenOn=!0;const e=this.ctx;this.sirenOsc=e.createOscillator(),this.sirenOsc.type="square",this.sirenOsc.frequency.value=720,this.sirenLfo=e.createOscillator(),this.sirenLfo.type="sine",this.sirenLfo.frequency.value=1.7;const n=e.createGain();n.gain.value=220,this.sirenLfo.connect(n),n.connect(this.sirenOsc.frequency),this.sirenGain=e.createGain(),this.sirenGain.gain.value=.018,this.sirenOsc.connect(this.sirenGain),this.sirenGain.connect(this.sfxGain),this.sirenOsc.start(),this.sirenLfo.start()}else if(!t&&this.sirenOn){this.sirenOn=!1;try{this.sirenGain.gain.setTargetAtTime(0,this.ctx.currentTime,.1),this.sirenOsc.stop(this.ctx.currentTime+.4),this.sirenLfo.stop(this.ctx.currentTime+.4)}catch{}}}}suspend(){this.ctx?.suspend?.()}resume(){this.ctx?.resume?.()}}const x_=document.getElementById("stage"),be=new m_,Be=new g_,Sn=new Lf,Bn=new gn(58,window.innerWidth/window.innerHeight,.1,1800);function tu(){const i=window.innerWidth/window.innerHeight;return i<.7?72:i<1?64:58}Bn.fov=tu();Bn.updateProjectionMatrix();const ze=new Cx({antialias:!0,powerPreference:"high-performance"});ze.setPixelRatio(Math.min(window.devicePixelRatio||1,1.65));ze.setSize(window.innerWidth,window.innerHeight);ze.toneMapping=zo;ze.toneMappingExposure=1;ze.outputColorSpace=ln;ze.domElement.id="game-canvas";ze.domElement.setAttribute("aria-label","San Andreas Neon State 3D world");x_.appendChild(ze.domElement);const ge=a_(Sn,ze);be.buildMap(ge);const B={mode:"foot",playing:!1,cash:12450,health:100,armor:0,wanted:0,battery:100,elapsed:0,clockStart:1182,activeVehicle:null,lastDamageAt:-99,lastCrimeAt:-99,lastCrashAt:-99,cameraShake:0,bustedTimer:0,police:[],endTimer:0,missionCompleteCooldown:0},tn={keys:new Set,forward:0,strafe:0,run:!1,handbrake:!1,jumpQueued:!1},bt={yaw:0,pitch:.17,dist:7.7,lastDrag:0,dragYaw:0,dragging:!1,lastX:0,lastY:0,target:new P,initialized:!1},kt=jh({player:!0,hoodie:2976592,pants:3752790,skin:9066042});kt.root.position.set(ge.spawn.x,nn(ge.spawn.x,ge.spawn.z),ge.spawn.z);kt.root.rotation.y=ge.spawn.heading;Sn.add(kt.root);Pi(kt,0,.016,{t:0});const me={heading:ge.spawn.heading,speed:0,vy:0,jump:0,grounded:!0,step:0},Hn=[],jn=[],Zs=[],ia=[],__=[];let Tn=null,Zt=null;const v_=["cyber","mantis","aero","volt","nova","titan","lumen"],M_=[-17.1,-11.4,-5.7,0,5.7,11.4,17.1];v_.forEach((i,t)=>{const e=Xr.find(s=>s.id===i),n=ol(e,{showcase:!0});n.group.position.set(M_[t],.3,ge.showcase.z),n.group.rotation.y=ge.showcase.heading,n.parked=!0,n.home=n.group.position.clone(),n.homeHeading=n.group.rotation.y,n.typesIndex=Xr.indexOf(e),Sn.add(n.group),f_(n),Hn.push(n),__.push(n.label)});const Ti=ta(778812),S_=["lumen","aero","nova","titan","lumen","aero","nova","titan","aero","lumen","nova"],Cr=[15197146,8884381,3359324,9187392,3107675,12821607,5785980,12565682,2699066,8011578];function y_(){for(let i=0;i<10;i++){const t=Xr.find(h=>h.id===S_[i]),e={...t,color:Cr[i%Cr.length],accent:Cr[(i+3)%Cr.length],id:`${t.id}-${i}`},n=ol(e,{ai:!0}),s=i%2===0?"x":"z",r=i%4<2?1:-1,a=Wt.roadCenters[1+Math.floor(Ti.next()*4)],o=s==="x"?a+r*4.15:a-r*4.15;let l=Ti.range(-150,150);s==="x"&&Math.abs(o-96)<12&&(l=Ti.range(115,155)*(Ti.next()>.5?1:-1)),s==="z"&&Math.abs(o)<40&&l>40&&l<110&&(l=-Ti.range(60,150)),n.group.position.set(s==="x"?l:o,.02,s==="x"?o:l),n.heading=s==="x"?r>0?Math.PI/2:-Math.PI/2:r>0?0:Math.PI,n.group.rotation.y=n.heading,n.parked=!1,n.ai=!0,Sn.add(n.group);const c={vehicle:n,axis:s,dir:r,road:a,lane:o,along:l,speed:Ti.range(7,13),phase:Ti.range(0,10)};jn.push(c),Hn.push(n)}}y_();const Pr=ta(44551),Xc=ge.blockTypes.filter(i=>i.type!=="plaza");for(let i=0;i<20;i++){const t=Xc[Math.floor(Pr.next()*Xc.length)],e=d_(i*7+3),n=22.2,s=n*8,r=Pr.range(0,s),a=Pr.range(.85,1.5),o={char:e,block:t,t:r,perimeter:s,edge:n,speed:a,dir:Pr.next()>.25?1:-1,state:"walk",timer:0,vx:0,vz:0,homeT:r},l=Uo(o);e.root.position.set(l.x,nn(l.x,l.z),l.z),e.root.rotation.y=l.heading,Sn.add(e.root),Zs.push(o)}function Uo(i){const t=i.edge*2;let e=i.t%i.perimeter;e<0&&(e+=i.perimeter);let n,s,r;return e<t?(n=i.block.x-i.edge+e,s=i.block.z-i.edge,r=Math.PI/2):e<t*2?(n=i.block.x+i.edge,s=i.block.z-i.edge+(e-t),r=0):e<t*3?(n=i.block.x+i.edge-(e-t*2),s=i.block.z+i.edge,r=-Math.PI/2):(n=i.block.x-i.edge,s=i.block.z+i.edge-(e-t*3),r=Math.PI),i.dir<0&&(r+=Math.PI),{x:n,z:s,heading:r}}const eu=new Re;Sn.add(eu);const E_=new Kr(.36),b_=new Nt({color:6747391,emissive:1816792,emissiveIntensity:2.1,metalness:.6,roughness:.12}),w_=new he({color:6747391,transparent:!0,opacity:.34,side:qe,toneMapped:!1}),nu=ii("rgba(140,250,255,1)");for(let i=0;i<ge.shardSpots.length;i++){const t=iu(ge.shardSpots[i].x,ge.shardSpots[i].z),e=new Re,n=new K(E_,b_);n.position.y=1.25,e.add(n);const s=new K(new hs(.8,.95,24),w_);s.rotation.x=-Math.PI/2,s.position.y=.08,e.add(s);const r=new _i(new ti({map:nu,color:6747391,transparent:!0,opacity:.7,blending:zn,depthWrite:!1,toneMapped:!1}));r.scale.set(2.8,2.8,1),r.position.y=1.28,e.add(r),e.position.set(t.x,nn(t.x,t.z),t.z),eu.add(e),ia.push({group:e,crystal:n,ring:s,collected:!1,spot:new P(t.x,0,t.z),phase:i*.7})}function iu(i,t){let e=i,n=t;for(let s=0;s<12&&!(!ge.colliders.some(a=>e>a.minX-1&&e<a.maxX+1&&n>a.minZ-1&&n<a.maxZ+1)||(e+=7,e>160&&(e=i,n-=7),n<-160));s++);return{x:xe(e,-225,225),z:xe(n,-225,224)}}function su(i){Tn&&(Sn.remove(Tn.group),Tn.group.traverse(c=>{c.geometry&&c.geometry.dispose?.()}));const t=new Re,e=16762967,n=new K(new Ie(.35,.9,44,12,1,!0),new he({color:e,transparent:!0,opacity:.075,side:qe,depthWrite:!1,blending:zn,toneMapped:!1}));n.position.y=22,t.add(n);const s=new K(new hs(2.7,3.15,48),new he({color:e,transparent:!0,opacity:.9,side:qe,toneMapped:!1,depthWrite:!1}));s.rotation.x=-Math.PI/2,s.position.y=.12,t.add(s);const r=new K(new hs(1.2,1.35,36),new he({color:16777215,transparent:!0,opacity:.6,side:qe,toneMapped:!1,depthWrite:!1}));r.rotation.x=-Math.PI/2,r.position.y=.13,t.add(r);const a=new K(new Kr(.62),new he({color:e,toneMapped:!1,transparent:!0,opacity:.9}));a.position.y=2.1,t.add(a);const o=new _i(new ti({map:nu,color:e,transparent:!0,opacity:.85,blending:zn,depthWrite:!1,toneMapped:!1}));o.scale.set(5,5,1),o.position.y=2.1,t.add(o);const l=T_("DROP ZONE",`$${Zt?.reward?.toLocaleString?.("en-US")||"2,500"}`);l.position.y=4.2,t.add(l),t.position.set(i.x,nn(i.x,i.z),i.z),Sn.add(t),Tn={group:t,diamond:a,ring:s,ring2:r,beam:n,label:l,spot:new P(i.x,0,i.z)}}function T_(i,t){const{c:e,ctx:n}=hn(512,160);n.clearRect(0,0,512,160),n.textAlign="center",n.font='900 52px "Arial Black", Arial, sans-serif',n.shadowColor="#ffc857",n.shadowBlur=22,n.fillStyle="#ffffff",n.fillText(i,256,70),n.shadowBlur=0,n.font="800 24px Arial, sans-serif",n.fillStyle="#ffc857",n.fillText(t,256,116);const s=fn(e),r=new _i(new ti({map:s,transparent:!0,depthWrite:!1,toneMapped:!1}));return r.scale.set(5.6,1.75,1),r}function $s(i=0){const t=iu(ge.missionSpots[i%ge.missionSpots.length].x,ge.missionSpots[i%ge.missionSpots.length].z),e=new P(t.x,0,t.z),n=["PROTOTYPE CELL","NEON SIGN PARTS","MEDICAL CARGO","VINYL CRATE","SERVER RACK","BATTERY MODULE","HOLOGRAM REEL"],s=[2500,2800,3100,3400,3800,4200,4700];Zt={index:i,spot:e,title:"COURIER RUN",target:n[i%n.length],reward:s[i%s.length],timeLeft:Math.max(95,165-i*7),maxTime:Math.max(95,165-i*7),startDistance:kt.root.position.distanceTo(e),completed:!1},su(e),be.toast(`NEW DROP · ${n[i%n.length]} · $${Zt.reward.toLocaleString("en-US")}`,"gold",3200)}function A_(){if(!Zt||Zt.completed)return;Zt.completed=!0,B.cash+=Zt.reward,Be.cash(),be.flash(),be.toast(`DELIVERY COMPLETE +$${Zt.reward.toLocaleString("en-US")}`,"gold",3e3),B.activeVehicle&&(B.activeVehicle,void 0);const i=Zt.index+1;be.showCinematic("DELIVERY COMPLETE",`+$${Zt.reward.toLocaleString("en-US")} · NEXT DROP INBOUND`,1900),setTimeout(()=>{B.playing&&$s(i)},2300)}function nn(i,t){if(t>168&&t<232)return .025;if(t>=232)return-.1;for(const e of ge.blockTypes)if(Math.abs(i-e.x)<24&&Math.abs(t-e.z)<24)return .29;return .02}function ll(i=4.6){const t=kt.root.position;let e=null,n=i;for(const s of Hn){if(s===B.activeVehicle||s.police)continue;const r=Math.hypot(s.group.position.x-t.x,s.group.position.z-t.z),a=i+Math.max(s.width,s.length)*.15;r<a&&r<n+1&&(e=s,n=r)}return e}function ru(i){if(!i||B.mode!=="foot")return;B.mode="car",B.activeVehicle=i,i.parked=!0,i.ai=!1,i.steer=0,i.speed=0,i.vel=new P,i.heading=i.group.rotation.y,i.battery=100,i.damage=0,i.accel=0,i.drift=0,i.boostBlend=0,i.lastCrash=-99;const t=jn.find(e=>e.vehicle===i);t&&jn.splice(jn.indexOf(t),1),kt.root.visible=i.type.shape==="bike",i.type.shape==="bike"&&(kt.root.position.copy(i.group.position),kt.root.rotation.order="YXZ",kt.root.rotation.y=i.heading,kt.root.position.y+=.24),i.labelsHidden=!0,R_(i),bt.yaw=i.heading-Math.PI,bt.pitch=.17,bt.dist=i.type.shape==="bike"?6.4:8.4,bt.lastDrag=B.elapsed,ra(),be.showVehicleCard(i),be.toast(`${i.type.name} · ${i.type.drivetrain}`,"",2600),Be.enterCar(),B.battery=100}function au(){const i=B.activeVehicle;if(!i)return;const t=i.heading,e=new P(Math.cos(t),0,-Math.sin(t)),n=[new P().copy(i.group.position).addScaledVector(e,-2.4),new P().copy(i.group.position).addScaledVector(e,2.4),new P().copy(i.group.position).add(new P(0,0,-i.length*.8)),new P().copy(i.group.position).add(new P(0,0,i.length*.8))];let s=n[0];for(const r of n)if(!ge.colliders.some(o=>r.x>o.minX-.6&&r.x<o.maxX+.6&&r.z>o.minZ-.6&&r.z<o.maxZ+.6)){s=r;break}kt.root.position.set(s.x,nn(s.x,s.z),s.z),kt.root.rotation.y=t+Math.PI/2,kt.root.visible=!0,me.heading=kt.root.rotation.y,me.speed=0,me.jump=0,me.vy=0,cl(i),i.speed=0,i.vel?.set(0,0,0),i.parked=!0,B.activeVehicle=null,B.mode="foot",bt.yaw=t+Math.PI/2-Math.PI,bt.dist=7.7,bt.lastDrag=B.elapsed,ra(),Be.blip(220,.09,.04)}function R_(i){cl(i);const t=i.length/2+.1,e=[-i.width*.3,i.width*.3];i.headlights=[];for(const n of e){const s=new Ld(14677247,120,55,Math.PI/7.5,.55,1.4);s.position.set(n,.92,t);const r=new Ne;r.position.set(n*1.4,.1,t+26),i.group.add(r),s.target=r,i.group.add(s),i.headlights.push({light:s,target:r})}}function cl(i){if(i?.headlights){for(const{light:t,target:e}of i.headlights)i.group.remove(t),i.group.remove(e),t.dispose?.();i.headlights=[]}}function C_(){if(B.police.length>=3||B.wanted<=0)return;const i=Xr.find(o=>o.id==="apex"),t=ol(i,{ai:!0});t.police=!0,t.ai=!0,t.speed=0,t.vel=new P;const e=Math.random()*Math.PI*2,n=B.activeVehicle?.group.position||kt.root.position,r=Wt.roadCenters[1+Math.floor(Math.random()*4)],a=xe(n.z+70*Math.sin(e),-150,150);t.group.position.set(r,.02,a),t.heading=Math.atan2(n.x-r,n.z-a),t.group.rotation.y=t.heading,Sn.add(t.group),B.police.push(t),Hn.push(t),be.toast("POLICE DISPATCHED · LOSE THEM","pink",3e3),Be.blip(300,.2,.05,"square")}function hl(){for(const i of B.police){Sn.remove(i.group);const t=Hn.indexOf(i);t>=0&&Hn.splice(t,1)}B.police.length=0,Be.setSiren(!1)}function ul(i=1,t="CRIME"){B.mode!=="down"&&(B.wanted=Math.min(5,B.wanted+i),B.lastCrimeAt=B.elapsed,be.toast(`${t.toUpperCase()} · WANTED ${"★".repeat(B.wanted)}`,"pink",2600),B.wanted>=2&&C_())}function sa(i){if(B.mode==="down")return;let t=i;if(B.armor>0){const e=Math.min(B.armor,t*.6);B.armor-=e,t-=e}B.health-=t,B.lastDamageAt=B.elapsed,B.cameraShake=Math.min(.55,B.cameraShake+.14),B.health<=0&&(B.health=0,ou("wasted"))}function ou(i){if(B.mode==="down")return;B.mode="down",B.endTimer=2.8,be.showEnd(i),i==="busted"?(B.cash=Math.max(0,B.cash-500),Be.setSiren(!1)):B.cash=Math.max(0,B.cash-250),Be.blip(i==="busted"?220:140,.7,.06,"sawtooth"),hl();const t=B.activeVehicle;t&&(cl(t),t.speed=0,t.vel?.set(0,0,0),B.activeVehicle=null),kt.root.visible=!1}function lu(){hl(),B.wanted=0,B.health=100,B.armor=0,B.mode="foot",B.activeVehicle=null,kt.root.visible=!0,kt.root.position.set(ge.spawn.x,nn(ge.spawn.x,ge.spawn.z),ge.spawn.z),kt.root.rotation.y=ge.spawn.heading,me.heading=ge.spawn.heading,me.speed=0,me.jump=0,me.vy=0,bt.yaw=0,bt.pitch=.17,bt.dist=7.7,bt.lastDrag=B.elapsed,be.hideEnd(),B.playing&&(!Zt||Zt.completed?$s(Zt?.index??0):su(Zt.spot))}window.addEventListener("keydown",i=>{const t=i.key.toLowerCase();if(["w","a","s","d"," ","shift","e","m","arrowup","arrowdown","arrowleft","arrowright"].includes(t)&&i.preventDefault(),!tn.keys.has(t)&&(tn.keys.add(t),t==="e"&&hu(),t==="m"&&document.getElementById("mute-btn")?.click(),t===" "&&B.mode==="foot"&&(tn.jumpQueued=!0),t==="r"&&B.activeVehicle)){const e=B.activeVehicle;e.vel?.set(0,0,0),e.speed=0,e.group.position.y=nn(e.group.position.x,e.group.position.z)}});window.addEventListener("keyup",i=>tn.keys.delete(i.key.toLowerCase()));window.addEventListener("blur",()=>tn.keys.clear());ze.domElement.addEventListener("pointerdown",i=>{i.button===0&&(bt.dragging=!0,bt.lastX=i.clientX,bt.lastY=i.clientY,bt.dragYaw=bt.yaw,ze.domElement.setPointerCapture?.(i.pointerId))});ze.domElement.addEventListener("pointermove",i=>{if(!bt.dragging)return;const t=i.clientX-bt.lastX,e=i.clientY-bt.lastY;bt.lastX=i.clientX,bt.lastY=i.clientY,bt.yaw-=t*.0052,bt.pitch=xe(bt.pitch+e*.0032,.04,.82),bt.lastDrag=B.elapsed,Math.abs(t)+Math.abs(e)>2&&(bt.dragYaw=bt.yaw)});const cu=()=>{bt.dragging=!1};ze.domElement.addEventListener("pointerup",cu);ze.domElement.addEventListener("pointercancel",cu);ze.domElement.addEventListener("contextmenu",i=>i.preventDefault());ze.domElement.addEventListener("wheel",i=>{bt.dist=xe(bt.dist+Math.sign(i.deltaY)*.6,5.2,13),i.preventDefault()},{passive:!1});function hu(){if(!B.playing||B.mode==="down")return;if(B.mode==="car"){const t=B.activeVehicle;if(t&&Math.abs(t.speed)>7){be.toast("SLOW DOWN TO EXIT","",1200);return}au();return}const i=ll(5.2);i&&ru(i)}be.onAction=hu;be.onMute=i=>Be.setMuted(i);be.onPlay=()=>{B.playing=!0,Be.init(),Be.setMuted(document.body.classList.contains("muted")),bt.yaw=0,bt.pitch=.17,bt.dist=7.7,bt.lastDrag=B.elapsed,ra(),Zt||$s(0),be.toast("WELCOME TO NEON STATE · 2026","",2400),setTimeout(()=>be.toast("COURIER JOB ACTIVE · FOLLOW THE GOLD BEAM","gold",3800),900),be.ready()};function P_(){const i=tn.keys,t=be.touch,e=(i.has("w")||i.has("arrowup")?1:0)-(i.has("s")||i.has("arrowdown")?1:0),n=(i.has("d")||i.has("arrowright")?1:0)-(i.has("a")||i.has("arrowleft")?1:0),s=i.has("shift")||t.boost,r=Math.hypot(t.x,t.y),a=xe(e+(t.y<-.15?-t.y*1.3:0)+(t.gas?1:0)-(t.brake?1:0),-1,1),o=xe(n+t.x,-1,1);return tn.forward=a,tn.strafe=o,tn.run=s,tn.handbrake=i.has(" ")||t.handbrake,{forward:a,strafe:o,run:s,handbrake:i.has(" ")||t.handbrake,boosting:i.has("shift")||t.boost,jump:tn.jumpQueued,moving:Math.abs(a)+Math.abs(o)+r>.1}}function L_(i,t){const e=new P(-Math.sin(bt.yaw),0,-Math.cos(bt.yaw)),n=new P(Math.cos(bt.yaw),0,-Math.sin(bt.yaw)),s=new P;s.addScaledVector(e,t.forward),s.addScaledVector(n,t.strafe);const r=s.length();let a=0;if(r>.08){s.normalize();const h=Math.atan2(s.x,s.z);me.heading=Oo(me.heading,h,12,i),a=t.run?6.6:3.5,a*=Math.min(1,r),kt.root.position.x+=s.x*a*i,kt.root.position.z+=s.z*a*i}me.speed=On(me.speed,a,9,i),kt.root.rotation.y=me.heading,t.jump&&me.grounded&&(me.vy=5.6,me.grounded=!1,tn.jumpQueued=!1),me.grounded||(me.vy-=15.5*i,me.jump+=me.vy*i,me.jump<=0&&(me.jump=0,me.vy=0,me.grounded=!0));let o=kt.root.position.x,l=kt.root.position.z;o=xe(o,-228,228),l=xe(l,-228,224);const c=.38;for(const h of ge.colliders){const u=xe(o,h.minX,h.maxX),f=xe(l,h.minZ,h.maxZ),d=o-u,p=l-f,_=d*d+p*p;if(_<c*c){let m=Math.sqrt(_);if(m<1e-4){const g=o-h.minX,v=h.maxX-o,b=l-h.minZ,S=h.maxZ-l,T=Math.min(g,v,b,S);T===g?o=h.minX-c:T===v?o=h.maxX+c:T===b?l=h.minZ-c:l=h.maxZ+c}else o+=d/m*(c-m),l+=p/m*(c-m)}}for(const h of Hn){if(h===B.activeVehicle)continue;const u=o-h.group.position.x,f=l-h.group.position.z,d=Math.max(h.width*.55,.7)+.32,p=Math.hypot(u,f);p<d&&p>1e-4&&(o+=u/p*(d-p),l+=f/p*(d-p))}kt.root.position.x=o,kt.root.position.z=l,kt.root.position.y=nn(o,l)+me.jump,Pi(kt,me.speed,i,{t:B.elapsed})}function I_(i,t){const e=B.activeVehicle;if(!e){B.mode="foot";return}e.vel||(e.vel=new P);const n=e.type.spec,s=e.type.shape,r=n.top/3.6*1,a=s==="bike"?21:s==="truck"||s==="cyber"?12:16,o=n.handling,l=o.startsWith("S")?2.65:o.startsWith("A")?2.25:o.startsWith("B")?1.85:1.55,c=t.boosting&&B.battery>.5,h=t.forward,u=h<-.05&&e.vel.dot(new P(Math.sin(e.heading),0,Math.cos(e.heading)))>.5,f=new P(Math.sin(e.heading),0,Math.cos(e.heading)),d=new P(Math.cos(e.heading),0,-Math.sin(e.heading));let p=e.vel.dot(f),_=e.vel.dot(d);h>.02?p+=a*(c?1.45:1)*i:h<-.02&&(p>.5?p-=27*i*-h:p+=a*.55*-h*i),p*=Math.exp(-(.26+(c?0:.05))*i);const m=r*(c?1.1:1)*(B.battery>0?1:.75);p=xe(p,-r*.32,m);const g=t.handbrake?1.1:s==="bike"?9.5:7.2;_*=Math.exp(-g*i);const v=t.strafe*.46;e.steer=On(e.steer||0,v,11,i);const b=xe(Math.abs(p)/7+.18,0,1),S=p<-.3?-1:1;e.heading+=e.steer*l*b*S*i*(t.handbrake?1.28:1),e.heading=(e.heading+Math.PI*3)%(Math.PI*2)-Math.PI,t.handbrake&&(p*=Math.exp(-1.1*i)),e.vel.copy(f).multiplyScalar(p).addScaledVector(d,_),e.group.position.addScaledVector(e.vel,i),e.group.rotation.order="YXZ",e.group.rotation.y=e.heading;const T=D_(e);T>0&&(sa(Math.max(0,T-5)*1.5),B.elapsed-e.lastCrash>.6&&Be.crash(T/10));const w=xe(-p*.0028,-.06,.06),x=xe(-e.steer*Math.abs(p)*.0022,-.055,.055);e.group.rotation.x=On(e.group.rotation.x,w,5,i),e.group.rotation.z=On(e.group.rotation.z,x,5,i);const M=nn(e.group.position.x,e.group.position.z)+.015;if(e.group.position.y=On(e.group.position.y,M,9,i),c&&Math.abs(p)>.1?B.battery=Math.max(0,B.battery-13*i):B.battery=Math.min(100,B.battery+3.2*i),e.battery=B.battery,e.speed=p,na(e,p,e.steer,i,u,B.elapsed),e.type.shape==="bike"?(kt.root.visible=!0,kt.root.position.copy(e.group.position),kt.root.rotation.order="YXZ",kt.root.rotation.y=e.heading,kt.root.position.y+=.24,Pi(kt,0,i,{riding:!0,t:B.elapsed})):kt.root.visible=!1,Math.abs(p)>2)for(const C of Zs){if(C.state!=="walk")continue;const A=C.char.root.position.x-e.group.position.x,I=C.char.root.position.z-e.group.position.z;if(A*A+I*I<5.5&&p>2.5){C.state="knocked",C.timer=0;const N=Math.min(10,p);C.vx=A/Math.max(.2,Math.hypot(A,I))*N*.7+e.vel.x*.25,C.vz=I/Math.max(.2,Math.hypot(A,I))*N*.7+e.vel.z*.25,C.char.dead=!0,ul(1,"ASSAULT"),Be.crash(.55),p*=.985}}}function D_(i,t){let e=0;const n=i.group.position,s=[-.34,0,.34],r=Math.max(.62,i.width*.54),a=Math.sin(i.heading),o=Math.cos(i.heading);for(const l of s){const c=n.x+a*l*i.length,h=n.z+o*l*i.length;for(const u of ge.colliders){const f=xe(c,u.minX,u.maxX),d=xe(h,u.minZ,u.maxZ),p=c-f,_=h-d,m=p*p+_*_;if(m<r*r){let g=Math.sqrt(m),v,b;if(g<1e-4){const w=c-u.minX,x=u.maxX-c,M=h-u.minZ,C=u.maxZ-h,A=Math.min(w,x,M,C);A===w?(v=-1,b=0,g=0):A===x?(v=1,b=0,g=0):A===M?(v=0,b=-1,g=0):(v=0,b=1,g=0)}else v=p/g,b=_/g;const S=r-g;n.x+=v*S,n.z+=b*S;const T=i.vel.x*v+i.vel.z*b;T<0&&(e=Math.max(e,-T),i.vel.x-=v*T*1.3,i.vel.z-=b*T*1.3,i.vel.multiplyScalar(.86))}}}Math.abs(n.x)>226&&(n.x=xe(n.x,-226,226),i.vel.x*=-.3,e=Math.max(e,Math.abs(i.vel.x))),n.z>222&&(n.z=222,i.vel.z*=-.3,e=Math.max(e,Math.abs(i.vel.z))),n.z<-226&&(n.z=-226,i.vel.z*=-.3);for(const l of Hn){if(l===i)continue;const c=n.x-l.group.position.x,h=n.z-l.group.position.z,u=Math.hypot(c,h),f=Math.max(i.width,l.width)*.62+Math.max(i.length,l.length)*.25;if(u<f&&u>.001){const d=c/u,p=h/u,_=f-u;n.x+=d*_*.6,n.z+=p*_*.6,l.group.position.x-=d*_*.12,l.group.position.z-=p*_*.12;const m=i.vel.x*d+i.vel.z*p;m<0&&(e=Math.max(e,-m*.6),i.vel.x-=d*m*1.1,i.vel.z-=p*m*1.1,i.vel.multiplyScalar(.9)),B.elapsed-(i.lastVehicleHit||-9)>1.4&&Math.abs(i.speed)>6&&(i.lastVehicleHit=B.elapsed,l.police||ul(1,"RECKLESS DRIVING"),Be.crash(.65))}}return e}function Oo(i,t,e,n){let s=t-i;for(;s>Math.PI;)s-=Math.PI*2;for(;s<-Math.PI;)s+=Math.PI*2;return i+s*(1-Math.exp(-e*n))}function uu(i){const t=B.activeVehicle?.group.position||kt.root.position;for(const e of jn){const n=e.vehicle,s=t.x-n.group.position.x,r=t.z-n.group.position.z,a=s*Math.sin(n.heading)+r*Math.cos(n.heading),o=Math.abs(s*Math.cos(n.heading)-r*Math.sin(n.heading)),l=a>0&&a<12&&o<2.7?1.5:e.speed;if(n.aiSpeed=On(n.aiSpeed??e.speed,l,2,i),e.along+=n.aiSpeed*i*e.dir,e.along>164&&(e.along=-164),e.along<-164&&(e.along=164),e.axis==="x"?(n.group.position.set(e.along,.02,e.lane),n.heading=e.dir>0?Math.PI/2:-Math.PI/2):(n.group.position.set(e.lane,.02,e.along),n.heading=e.dir>0?0:Math.PI),n.group.rotation.y=n.heading,na(n,n.aiSpeed*e.dir,0,i,!1,B.elapsed+e.phase),B.mode==="foot"){const c=kt.root.position.x-n.group.position.x,h=kt.root.position.z-n.group.position.z;c*c+h*h<3.6&&n.aiSpeed>4&&(kt.root.position.x+=c*.1+.2,kt.root.position.z+=h*.1+.2,sa(3),Be.horn())}}}function fu(i){for(const t of Zs){if(t.state==="knocked"){if(t.timer+=i,t.char.root.position.x+=t.vx*i,t.char.root.position.z+=t.vz*i,t.vx*=Math.exp(-2.3*i),t.vz*=Math.exp(-2.3*i),t.char.root.rotation.z=On(t.char.root.rotation.z,Math.PI/2,5,i),t.char.root.position.y=On(t.char.root.position.y,nn(t.char.root.position.x,t.char.root.position.z)+.18,6,i),Pi(t.char,0,i,{t:B.elapsed}),t.timer>6){t.state="walk",t.t=t.homeT,t.char.dead=!1,t.char.root.rotation.set(0,0,0),t.char.hips.rotation.z=0;const n=Uo(t);t.char.root.position.set(n.x,nn(n.x,n.z),n.z)}continue}t.t+=t.speed*t.dir*i;const e=Uo(t);t.char.root.position.x=e.x,t.char.root.position.z=e.z,t.char.root.position.y=nn(e.x,e.z),t.char.root.rotation.y=e.heading,Pi(t.char,t.speed,i,{t:B.elapsed})}}function N_(i){const t=B.activeVehicle?.group.position||kt.root.position;let e=999;for(const n of B.police){const s=t.x-n.group.position.x,r=t.z-n.group.position.z,a=Math.hypot(s,r);e=Math.min(e,a);let l=Math.atan2(s,r)-n.heading;for(;l>Math.PI;)l-=Math.PI*2;for(;l<-Math.PI;)l+=Math.PI*2;n.heading+=xe(l,-1,1)*2.1*i;const c=a>9?30:10;n.speed=On(n.speed||0,c,1.8,i);const h=new P(Math.sin(n.heading),0,Math.cos(n.heading));n.group.position.addScaledVector(h,n.speed*i),n.group.position.y=On(n.group.position.y,nn(n.group.position.x,n.group.position.z)+.015,8,i),n.group.rotation.y=n.heading,na(n,n.speed,0,i,!1,B.elapsed),n.group.position.x=xe(n.group.position.x,-220,220),n.group.position.z=xe(n.group.position.z,-220,220),a<4.2&&B.mode!=="down"&&((B.activeVehicle?Math.abs(B.activeVehicle.speed):0)<4.8?(B.bustedTimer+=i,B.bustedTimer>.7&&ou("busted")):(B.bustedTimer=0,sa(8*i),B.cameraShake=Math.min(.4,B.cameraShake+.02)))}B.police.length?e>4.2&&(B.bustedTimer=Math.max(0,B.bustedTimer-i*2)):B.bustedTimer=0,Be.setSiren(B.police.length>0&&e<75)}function qr(i,t=!1){const e=B.activeVehicle;if(B.mode==="foot"||B.mode==="down"){if(bt.target.set(kt.root.position.x,kt.root.position.y+1.75,kt.root.position.z),B.mode==="foot"){const o=me.speed>.4;!bt.dragging&&o&&B.elapsed-bt.lastDrag>1.1&&(bt.yaw=Oo(bt.yaw,me.heading-Math.PI,1.4,i))}}else e&&(bt.target.set(e.group.position.x,e.group.position.y+1.55,e.group.position.z),!bt.dragging&&B.elapsed-bt.lastDrag>1.4&&(bt.yaw=Oo(bt.yaw,e.heading-Math.PI,2.1,i)));const n=bt.dist,s=Math.cos(bt.pitch),r=new P(bt.target.x+Math.sin(bt.yaw)*n*s,bt.target.y+Math.sin(bt.pitch)*n+.55,bt.target.z+Math.cos(bt.yaw)*n*s),a=nn(r.x,r.z)+.55;r.y<a&&(r.y=a),B.cameraShake>.001&&(r.x+=(Math.random()-.5)*B.cameraShake,r.y+=(Math.random()-.5)*B.cameraShake,r.z+=(Math.random()-.5)*B.cameraShake,B.cameraShake*=Math.exp(-5*i)),t||!bt.initialized?(Bn.position.copy(r),bt.smoothTarget=bt.target.clone(),bt.initialized=!0):(Bn.position.lerp(r,1-Math.exp(-7*i)),bt.smoothTarget||(bt.smoothTarget=bt.target.clone()),bt.smoothTarget.lerp(bt.target,1-Math.exp(-10*i))),Bn.lookAt(bt.smoothTarget||bt.target)}function ra(){qr(.016,!0),bt.initialized=!0}function Fo(i){const t=P_();if(B.mode==="foot")L_(i,t);else if(B.mode==="car")I_(i,t);else if(B.mode==="down"&&(B.endTimer-=i,B.endTimer<=0)){lu();return}uu(i),fu(i),N_(i),B.mode!=="down"&&B.elapsed-B.lastDamageAt>7&&(B.health=Math.min(100,B.health+1.6*i)),B.wanted>0&&B.elapsed-B.lastCrimeAt>22&&B.elapsed-(B.lastWantedDecay||0)>9&&B.police.every(n=>n.group.position.distanceTo(B.activeVehicle?.group.position||kt.root.position)>55)&&(B.wanted=Math.max(0,B.wanted-1),B.lastWantedDecay=B.elapsed,B.wanted===0&&hl());const e=B.activeVehicle?.group.position||kt.root.position;for(const n of ia){if(n.collected)continue;n.crystal.rotation.y+=i*1.8,n.crystal.position.y=1.25+Math.sin(B.elapsed*2+n.phase)*.16,n.ring.scale.setScalar(1+Math.sin(B.elapsed*2.2+n.phase)*.12),n.ring.material.opacity=.24+Math.sin(B.elapsed*2+n.phase)*.1;const s=e.x-n.spot.x,r=e.z-n.spot.z;s*s+r*r<6.2&&(n.collected=!0,n.group.visible=!1,B.cash+=250,Be.cash(),be.toast("DATA SHARD SECURED +$250","gold",2200),be.flash())}if(Tn){Tn.group.rotation.y+=i*.35,Tn.diamond.rotation.y+=i*2.2,Tn.diamond.position.y=2.1+Math.sin(B.elapsed*2.4)*.18;const n=1+Math.sin(B.elapsed*2.8)*.08;if(Tn.ring.scale.setScalar(n),Tn.ring2.scale.setScalar(1.4-(n-1)*3),Tn.label.position.y=4.2+Math.sin(B.elapsed*1.7)*.12,Zt&&!Zt.completed){const s=e.x-Zt.spot.x,r=e.z-Zt.spot.z,a=Math.hypot(s,r);Zt.distance=a,a<4.2&&A_()}}Zt&&!Zt.completed&&(Zt.timeLeft-=i,Zt.timeLeft<=0&&(Zt.timeLeft=0,Zt.completed=!0,be.toast("DROP MISSED · REROUTING","pink",3e3),Be.blip(150,.5,.05,"sawtooth"),setTimeout(()=>{B.playing&&$s(Zt?Zt.index:0)},2600))),qr(i)}function U_(){const i=Math.floor(B.clockStart+B.elapsed/5)%1440,t=Math.floor(i/60),e=i%60;return`${String(t).padStart(2,"0")}:${String(e).padStart(2,"0")}`}function Yr(){const i=B.activeVehicle,t=i?.group.position||kt.root.position,e=Zt&&Zt.spot?Math.hypot(t.x-Zt.spot.x,t.z-Zt.spot.z):0,n=B.mode==="foot"?(()=>{const h=ll(5.2);return h?`DRIVE · ${h.type.name}`:""})():B.mode==="car"&&Math.abs(i?.speed||0)<2.2?"EXIT VEHICLE":"",s=i?Math.abs(i.speed||0)*3.6:me.speed*3.6;let r="N";i&&(i.speed<-.4?r="R":Math.abs(i.speed)<.2?r="N":r="D");const a=Zt?`${String(Math.max(0,Math.floor(Zt.timeLeft/60))).padStart(2,"0")}:${String(Math.max(0,Math.floor(Zt.timeLeft%60))).padStart(2,"0")}`:"--:--",o=e>999?`${(e/1e3).toFixed(1)} km`:`${Math.round(e)} m`,l=Zt?.startDistance||Math.max(1,e),c=Zt?xe(1-e/Math.max(l,60),.02,1):0;be.update({player:{x:t.x,z:t.z,heading:i?i.heading:me.heading},speedKmh:s,gear:r,cash:B.cash,health:B.health,armor:B.armor,wanted:B.wanted,clock:U_(),district:be.districtFor(t.x,t.z),vehicle:i?i.type:null,battery:B.battery,prompt:n,mission:Zt&&!Zt.completed?{title:Zt.title,target:Zt.target,timerText:a,distanceText:o,progress:c}:null,markers:{mission:Zt&&!Zt.completed?Zt.spot:null,shards:ia.filter(h=>!h.collected).map(h=>h.spot),traffic:[...jn.map(h=>h.vehicle.group.position),...B.police.map(h=>h.group.position)].map((h,u)=>({x:h.x,z:h.z,police:u>=jn.length}))}}),be._prompt=n}let qc=performance.now(),Yc=!0;function du(i){requestAnimationFrame(du);const t=Math.min(.05,Math.max(.001,(i-qc)/1e3));if(qc=i,B.elapsed+=t,ge.update(t,B.elapsed),B.playing)B.mode!=="down"?Fo(t):(B.endTimer-=t,B.endTimer<=0&&lu(),uu(t),fu(t),qr(t)),Yr(),Be.updateEngine({driving:B.mode==="car",speed:B.activeVehicle?.speed||0,throttle:tn.forward,braking:tn.keys.has("s"),boosting:tn.keys.has("shift")||be.touch.boost,drifting:!!B.activeVehicle&&Math.abs(B.activeVehicle.steer||0)>.2&&Math.abs(B.activeVehicle.speed||0)>8});else{Pi(kt,0,t,{t:B.elapsed});for(const s of Zs)Pi(s.char,s.speed,t,{t:B.elapsed});for(const s of jn)na(s.vehicle,s.aiSpeed||0,0,t,!1,B.elapsed);qr(t)}const e=32,n=B.activeVehicle?.group.position||kt.root.position;for(const s of Hn){if(!s.label)continue;const r=s.group.position.distanceTo(n);s.label.visible=B.playing&&!B.activeVehicle&&r<e&&B.mode!=="down"}ze.render(Sn,Bn),Yc&&(Yc=!1,be.ready())}function O_(){Bn.aspect=window.innerWidth/window.innerHeight,Bn.fov=tu(),Bn.updateProjectionMatrix(),ze.setPixelRatio(Math.min(window.devicePixelRatio||1,1.65)),ze.setSize(window.innerWidth,window.innerHeight)}window.addEventListener("resize",O_);document.addEventListener("visibilitychange",()=>{document.hidden?Be.suspend():B.playing&&Be.resume()});window.__SA={state:B,player:kt,playerState:me,world:ge,vehicles:Hn,traffic:jn,peds:Zs,shards:ia,input:tn,camera:Bn,renderer:ze,scene:Sn,nearestVehicle:ll,enterVehicle:ru,exitVehicle:au,startMission:$s,updateGame:Fo,updateUI:Yr,addWanted:ul,damagePlayer:sa,surfaceHeight:nn,get mission(){return Zt},get police(){return B.police},teleport(i,t){const e=nn(i,t);kt.root.position.set(i,e,t),B.activeVehicle&&(B.activeVehicle.group.position.set(i,e,t),B.activeVehicle.speed=0,B.activeVehicle.vel?.set(0,0,0))},setCamera(i,t,e){typeof i=="number"&&(bt.yaw=i),typeof t=="number"&&(bt.pitch=t),typeof e=="number"&&(bt.dist=e),bt.initialized=!1},step(i=1/60,t=1){for(let e=0;e<t;e++)B.elapsed+=i,Fo(i);Yr()}};ra();Yr();requestAnimationFrame(du);
