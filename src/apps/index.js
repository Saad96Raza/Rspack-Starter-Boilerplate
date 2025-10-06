import Home from './home';
import Contact from './contact';
import barba from '@barba/core';
import GSAP from 'gsap/src/index'
import  '../scss/main.scss';



class App{
    constructor(){
        $(()=>{
            this.pages = {
                home : new Home(),
                contact : new Contact()
            }
            this.createAjaxNavigation()
            this.createReRender()
        })   
        
    }
    createAjaxNavigation(){
       const easeIn = (container,done)=> {
            return GSAP.to(container, {
                autoAlpha: 0,
                duration: 1,
                ease: 'none',
                onComplete: ()=> done()
            })
        }

        const  easeOut = (container) => {

            return GSAP.from(container, {
                autoAlpha: 0,
                duration: 1,
                ease: 'none',
            })
        }

        barba.init({
                transitions: [
                {
                once({ next }) {
                     easeOut(next.container);
                },
                leave({ current }) {
                    const done = this.async();
                    easeIn(current.container, done);
                },
                enter({ next }) {
                     easeOut(next.container);
                }
                }
            ],
            
        })
    }
    createReRender(){
        
        barba.hooks.before(() => {
        })
    
        barba.hooks.after(() => {
            this.pages.home.createReRender() 
            this.pages.contact.createReRender() 
        })
    }

}

new App()
