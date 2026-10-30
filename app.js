'use strict';
const durations={focus:25*60,short:5*60,long:15*60};
let mode='focus',remaining=durations.focus,running=false,deadline=0,interval=null;
const clock=document.querySelector('#clock'),start=document.querySelector('#start'),status=document.querySelector('#status'),progress=document.querySelector('#progress');
function render(){const m=Math.floor(remaining/60),s=remaining%60;const label=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');clock.textContent=label;document.title=(running?label+' · ':'')+'Leslie Coello · Pixel Focus';progress.style.width=(100*(1-remaining/durations[mode]))+'%';start.textContent=running?'Pausar Ⅱ':remaining===0?'Otra sesión ▶':remaining===durations[mode]?'Iniciar ▶':'Continuar ▶';}
function stop(){running=false;clearInterval(interval);interval=null;}
function tick(){remaining=Math.max(0,Math.ceil((deadline-Date.now())/1000));if(remaining===0){stop();status.textContent=mode==='focus'?'¡Misión completada! Tómate un descanso.':'Descanso terminado. ¿Otra misión?';}render();}
start.addEventListener('click',()=>{if(running){tick();stop();status.textContent='En pausa. Continúa cuando quieras.';}else{if(remaining===0)remaining=durations[mode];running=true;deadline=Date.now()+remaining*1000;interval=setInterval(tick,250);status.textContent=mode==='focus'?'Misión en curso. Un paso a la vez.':'Recarga energía. Este tiempo es para ti.';}render();});
document.querySelector('#reset').addEventListener('click',()=>{stop();remaining=durations[mode];status.textContent='Sesión reiniciada. Tú marcas el ritmo.';render();});
document.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>{stop();mode=button.dataset.mode;remaining=durations[mode];document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));status.textContent=mode==='focus'?'Tu próxima misión empieza aquí.':'Todo listo para descansar.';render();}));
document.addEventListener('visibilitychange',()=>{if(running)tick();});document.querySelector('#year').textContent=new Date().getFullYear();render();
