import { Directive, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';


@Directive({ selector: '[appReveal]', standalone: true })
export class RevealDirective implements OnInit, OnDestroy {
    private observer?: IntersectionObserver;
    constructor(private el: ElementRef, private r: Renderer2) { }


    ngOnInit() {
        const node = this.el.nativeElement as HTMLElement;
        this.r.addClass(node, 'opacity-0');
        this.r.addClass(node, 'translate-y-4');
        this.r.addClass(node, 'transition');
        this.r.addClass(node, 'duration-700');
        this.r.addClass(node, 'ease-out');


        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    this.r.removeClass(node, 'opacity-0');
                    this.r.removeClass(node, 'translate-y-4');
                    this.observer?.disconnect();
                }
            });
        }, { threshold: 0.15 });


        this.observer.observe(node);
    }
    ngOnDestroy() { this.observer?.disconnect(); }
}