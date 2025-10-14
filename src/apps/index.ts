import barba from '@barba/core'
import Home from './home';
import Contact from './contact';
import GSAP from 'gsap'
import  '../scss/main.scss';


class App{
    private pages: Record<string,any> = {
        home: new Home(),
        contact: new Contact(),
    }
    constructor(){
        this.pages.home
        this.pages.contact
  
        this.createAjaxNavigation()
        this.createReRender()
    }
    private createAjaxNavigation(){
       const easeIn = (container:HTMLElement,done:()=> void)=> {
            return GSAP.to(container,{
                autoAlpha: 0,
                duration: 1,
                ease: 'none',
                onComplete:function(){
                    done()
                }
            })
        }
        const  easeOut = (container:HTMLElement ) => {
            return GSAP.from(container, {
                autoAlpha: 0,
                duration: 1,
                ease: 'none',
            })
        }
        (barba as any).init({
                transitions: [
                {
                once: function ({ next }: { next: {container: HTMLElement} }) {
                    easeOut(next.container)
                },
                            
                leave:function(this:{ async: () => () => void },{ current }:{current:{container:HTMLElement}}) {
                    const done:()=> void = this.async()
                    easeIn(current.container, done)
                },
                enter:function({ next}:{next:{container:HTMLElement}}) {
                    easeOut(next.container)
                }
                }
            ],
            
        })
    }
    private createReRender(){
        
        barba.hooks.before(() => {
        })
    
        barba.hooks.after(() => {
            this.pages.home.createReRender() 
            this.pages.contact.createReRender() 
        })
    }

}

$(function(){
    new App()
})

