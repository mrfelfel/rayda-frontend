(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{tePd:function(l,n,a){"use strict";a.r(n);var t=a("8Y7J"),u=a("mrSG");class e{constructor(){this.deferredPrompt=null,this.install=!1}ngOnInit(){window.addEventListener("beforeinstallprompt",l=>u.b(this,void 0,void 0,function*(){try{yield l.preventDefault(),this.deferredPrompt=l,console.log("[Installer] : Before installing."),localStorage.installedPwa||(this.install=!0)}catch(n){console.warn("[Installer Error] : "+n)}})),window.addEventListener("appinstalled",l=>{this.install=!1,console.log("[Installer] : App installed.")})}installfunc(){null!=this.deferredPrompt&&(this.deferredPrompt.prompt(),this.deferredPrompt.userChoice.then(l=>(this.deferredPrompt=null,"accepted"===l.outcome&&(localStorage.installedPwa="installed",!0))))}}var o=a("05kH");class i{constructor(l,n,a){this.activatedRoute=l,this.socket=n,this.cdr=a,this.chats="",this.message="",this.user="",this.sct=0}ngOnInit(){this.user=this.activatedRoute.snapshot.params.id,this.socket.socket.on("chat",l=>{console.log(l),l.forEach(l=>{l.from!=localStorage.uid&&l.from!=this.user&&l.to!=localStorage.uid&&l.to!=this.user||this.Add(l.from+" : "+l.message)}),document.getElementById("chts").scrollTop=this.sct}),this.socket.socket.emit("getAllchats",{uid:this.user})}Add(l){this.chats+=`${l} \n \n`;const n=document.getElementById("chts");this.sct+=n.scrollHeight+10,n.scrollTop=this.sct,this.cdr.markForCheck()}send(){if(this.message){if(this.user===localStorage.uid)return this.user="",this.message="",void this.cdr.markForCheck();this.Add(localStorage.uid+" : "+this.message),this.socket.socket.emit("chat",{uid:this.user,message:this.message}),this.message="",this.cdr.markForCheck()}}}class r{}var d=a("pMnS"),s=a("bujt"),c=a("Fwaw"),b=a("5GAg"),m=a("omvX"),h=a("lzlj"),p=a("igqZ"),f=a("SVse"),g=t.rb({encapsulation:0,styles:[[".row[_ngcontent-%COMP%]{padding-top:10px}#timer[_ngcontent-%COMP%]{font-size:23px}"]],data:{}});function F(l){return t.Pb(0,[(l()(),t.tb(0,0,null,null,2,"button",[["color","primary"],["mat-raised-button",""]],[[1,"disabled",0],[2,"_mat-animation-noopable",null]],[[null,"click"]],function(l,n,a){var t=!0;return"click"===n&&(t=!1!==l.component.installfunc()&&t),t},s.d,s.b)),t.sb(1,180224,null,0,c.b,[t.k,b.h,[2,m.a]],{color:[0,"color"]},null),(l()(),t.Nb(-1,0,["\u0646\u0635\u0628 \u0628\u0627\u062f\u0627\u0645"]))],function(l,n){l(n,1,0,"primary")},function(l,n){l(n,0,0,t.Fb(n,1).disabled||null,"NoopAnimations"===t.Fb(n,1)._animationMode)})}function _(l){return t.Pb(0,[(l()(),t.tb(0,0,null,null,14,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.tb(1,0,null,null,13,"div",[["class","col l5 m10 s12 "]],null,null,null,null,null)),(l()(),t.tb(2,0,null,null,12,"mat-card",[["class","mat-card"]],null,null,null,h.d,h.a)),t.sb(3,49152,null,0,p.a,[],null,null),(l()(),t.tb(4,0,null,0,1,"h3",[["style","margin:0; padding: 0;"]],null,null,null,null,null)),(l()(),t.Nb(-1,null,["\u0628\u0647 \u0645\u062f\u06cc\u0631\u06cc\u062a \u062a\u063a\u0630\u06cc\u0647 \u0628\u0627\u062f\u0627\u0645 \u062e\u0648\u0634 \u0622\u0645\u062f\u06cc\u062f"])),(l()(),t.tb(6,0,null,0,1,"h5",[["style","margin:0; margin-bottom:5px;  padding: 0;"]],null,null,null,null,null)),(l()(),t.Nb(-1,null,["\u06a9\u0627\u0631\u06cc \u0627\u0632 \u062a\u06cc\u0645 \u0631\u0627\u06cc\u062f\u0627"])),(l()(),t.tb(8,0,null,0,6,"mat-card-content",[["class","mat-card-content"]],null,null,null,null,null)),t.sb(9,16384,null,0,p.c,[],null,null),(l()(),t.Nb(-1,null,[" \u0633\u06cc\u0633\u062a\u0645 \u062f\u0631 \u062d\u0627\u0644 \u0645\u0647\u0627\u062c\u0631\u062a \u0633\u0627\u062e\u062a\u0627\u0631\u06cc \u0628\u0647 \u0646\u0633\u062e\u0647 \u062c\u062f\u06cc\u062f \u0627\u0633\u062a \u0627\u0628\u0632\u0627\u0631 \u0647\u0627\u06cc \u062c\u062f\u06cc\u062f \u06f1 - \u062c\u0639\u0628\u0647 \u0645\u062d\u0648\u0631 \u06f2 - \u062a\u0648\u0644\u06cc\u062f \u06a9\u0646\u0646\u062f\u0647 \u0631\u0648\u0644 \u0647\u0627\u06cc \u0642\u06cc\u0645\u062a \u06af\u0630\u0627\u0631\u06cc \u06f3 - \u06af\u0632\u0627\u0631\u0634 \u0633\u0627\u0632 \u0627\u06cc\u0646 \u0631\u0648\u0632 \u062f\u0648\u0645 \u0645\u0647\u0627\u062c\u0631\u062a \u0627\u0633\u062a \u0627\u0632 \u0635\u0628\u0631 \u0634\u0645\u0627 \u0633\u067e\u0627\u0633 \u06af\u0630\u0627\u0631\u06cc\u0645 \u0628\u0647 \u062f\u0644\u06cc\u0644 \u062a\u063a\u06cc\u06cc\u0631\u0627\u062a \u0633\u0627\u062e\u062a\u0627\u0631\u06cc \u0628\u0631\u062e\u06cc \u0627\u0632 \u0648\u06cc\u0698\u06af\u06cc \u0647\u0627 \u0645\u0645\u06a9\u0646 \u0627\u0633\u062a \u062f\u0631 \u062f\u0633\u062a\u0631\u0633 \u0646\u0628\u0627\u0634\u062f "])),(l()(),t.tb(11,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),t.tb(12,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),t.ib(16777216,null,null,1,null,F)),t.sb(14,16384,null,0,f.k,[t.O,t.L],{ngIf:[0,"ngIf"]},null)],function(l,n){l(n,14,0,n.component.install)},null)}function v(l){return t.Pb(0,[(l()(),t.tb(0,0,null,null,1,"app-home",[],null,null,null,_,g)),t.sb(1,114688,null,0,e,[],null,null)],function(l,n){l(n,1,0)},null)}var C=t.pb("app-home",e,v,{},{},[]),y=a("dJrM"),w=a("HsOI"),k=a("Xd0L"),L=a("IP0z"),D=a("/HVE"),S=a("s7LF"),P=a("ZwOa"),I=a("oapL"),N=a("iInd"),M=t.rb({encapsulation:0,styles:[["mat-form-field[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%]{width:100%}"]],data:{}});function x(l){return t.Pb(0,[(l()(),t.tb(0,0,null,null,59,"mat-card",[["class","mat-card"],["style","margin : 10px"]],null,null,null,h.d,h.a)),t.sb(1,49152,null,0,p.a,[],null,null),(l()(),t.tb(2,0,null,0,7,"mat-card-header",[["class","mat-card-header"]],null,null,null,h.c,h.b)),t.sb(3,49152,null,0,p.d,[],null,null),(l()(),t.tb(4,0,null,1,2,"mat-card-title",[["class","mat-card-title"]],null,null,null,null,null)),t.sb(5,16384,null,0,p.g,[],null,null),(l()(),t.Nb(-1,null,["\u0633\u062e\u0646 \u067e\u0631\u0627\u06a9\u0646\u06cc"])),(l()(),t.tb(7,0,null,1,2,"mat-card-subtitle",[["class","mat-card-subtitle"]],null,null,null,null,null)),t.sb(8,16384,null,0,p.f,[],null,null),(l()(),t.Nb(-1,null,["\u0628\u062e\u0634 \u0645\u062e\u0641\u06cc"])),(l()(),t.tb(10,0,null,0,44,"mat-card-content",[["class","mat-card-content"]],null,null,null,null,null)),t.sb(11,16384,null,0,p.c,[],null,null),(l()(),t.tb(12,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),t.Nb(-1,null,[" \u0633\u06cc\u0633\u062a\u0645 \u067e\u06cc\u0627\u0645 \u0631\u0633\u0627\u0646\u06cc \u0628\u06cc\u0646 \u062f\u0648 \u06a9\u0627\u0631\u0628\u0631 \u067e\u06cc\u0627\u0645 \u0647\u0627\u06cc \u0627\u06cc\u0646 \u0635\u0641\u062d\u0647 \u0630\u062e\u06cc\u0631\u0647 \u0645\u06cc\u06af\u0631\u062f\u062f \u0648 \u0628\u0639\u062f \u0627\u0632 \u0648\u0631\u0648\u062f \u0645\u062c\u062f\u062f \u0642\u0627\u0628\u0644 \u062f\u0633\u062a\u0631\u0633\u06cc \u0627\u0633\u062a \u0627\u06cc\u0646 \u0633\u06cc\u0633\u062a\u0645 \u0627\u0632\u0645\u0627\u06cc\u0634\u06cc \u0627\u0633\u062a "])),(l()(),t.tb(14,0,null,null,19,"mat-form-field",[["class","mat-form-field"]],[[2,"mat-form-field-appearance-standard",null],[2,"mat-form-field-appearance-fill",null],[2,"mat-form-field-appearance-outline",null],[2,"mat-form-field-appearance-legacy",null],[2,"mat-form-field-invalid",null],[2,"mat-form-field-can-float",null],[2,"mat-form-field-should-float",null],[2,"mat-form-field-has-label",null],[2,"mat-form-field-hide-placeholder",null],[2,"mat-form-field-disabled",null],[2,"mat-form-field-autofilled",null],[2,"mat-focused",null],[2,"mat-accent",null],[2,"mat-warn",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[2,"_mat-animation-noopable",null]],null,null,y.b,y.a)),t.sb(15,7520256,null,9,w.b,[t.k,t.h,[2,k.h],[2,L.b],[2,w.a],D.a,t.y,[2,m.a]],null,null),t.Lb(603979776,1,{_controlNonStatic:0}),t.Lb(335544320,2,{_controlStatic:0}),t.Lb(603979776,3,{_labelChildNonStatic:0}),t.Lb(335544320,4,{_labelChildStatic:0}),t.Lb(603979776,5,{_placeholderChild:0}),t.Lb(603979776,6,{_errorChildren:1}),t.Lb(603979776,7,{_hintChildren:1}),t.Lb(603979776,8,{_prefixChildren:1}),t.Lb(603979776,9,{_suffixChildren:1}),(l()(),t.tb(25,0,null,1,8,"textarea",[["class","mat-input-element mat-form-field-autofill-control"],["cols","30"],["id","chts"],["matInput",""],["name",""],["placeholder","\u067e\u06cc\u0627\u0645 \u0647\u0627"],["readonly",""],["rows","10"]],[[2,"mat-input-server",null],[1,"id",0],[1,"placeholder",0],[8,"disabled",0],[8,"required",0],[1,"readonly",0],[1,"aria-describedby",0],[1,"aria-invalid",0],[1,"aria-required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"],[null,"focus"]],function(l,n,a){var u=!0,e=l.component;return"input"===n&&(u=!1!==t.Fb(l,26)._handleInput(a.target.value)&&u),"blur"===n&&(u=!1!==t.Fb(l,26).onTouched()&&u),"compositionstart"===n&&(u=!1!==t.Fb(l,26)._compositionStart()&&u),"compositionend"===n&&(u=!1!==t.Fb(l,26)._compositionEnd(a.target.value)&&u),"blur"===n&&(u=!1!==t.Fb(l,30)._focusChanged(!1)&&u),"focus"===n&&(u=!1!==t.Fb(l,30)._focusChanged(!0)&&u),"input"===n&&(u=!1!==t.Fb(l,30)._onInput()&&u),"ngModelChange"===n&&(u=!1!==(e.chats=a)&&u),u},null,null)),t.sb(26,16384,null,0,S.d,[t.D,t.k,[2,S.a]],null,null),t.Kb(1024,null,S.k,function(l){return[l]},[S.d]),t.sb(28,671744,null,0,S.p,[[8,null],[8,null],[8,null],[6,S.k]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t.Kb(2048,null,S.l,null,[S.p]),t.sb(30,999424,null,0,P.b,[t.k,D.a,[6,S.l],[2,S.o],[2,S.h],k.b,[8,null],I.a,t.y],{id:[0,"id"],placeholder:[1,"placeholder"],readonly:[2,"readonly"]},null),t.sb(31,16384,null,0,S.m,[[4,S.l]],null,null),t.Kb(2048,[[1,4],[2,4]],w.c,null,[P.b]),(l()(),t.Nb(-1,null,["         "])),(l()(),t.tb(34,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),t.tb(35,0,null,null,18,"mat-form-field",[["class","mat-form-field"]],[[2,"mat-form-field-appearance-standard",null],[2,"mat-form-field-appearance-fill",null],[2,"mat-form-field-appearance-outline",null],[2,"mat-form-field-appearance-legacy",null],[2,"mat-form-field-invalid",null],[2,"mat-form-field-can-float",null],[2,"mat-form-field-should-float",null],[2,"mat-form-field-has-label",null],[2,"mat-form-field-hide-placeholder",null],[2,"mat-form-field-disabled",null],[2,"mat-form-field-autofilled",null],[2,"mat-focused",null],[2,"mat-accent",null],[2,"mat-warn",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[2,"_mat-animation-noopable",null]],null,null,y.b,y.a)),t.sb(36,7520256,null,9,w.b,[t.k,t.h,[2,k.h],[2,L.b],[2,w.a],D.a,t.y,[2,m.a]],null,null),t.Lb(603979776,10,{_controlNonStatic:0}),t.Lb(335544320,11,{_controlStatic:0}),t.Lb(603979776,12,{_labelChildNonStatic:0}),t.Lb(335544320,13,{_labelChildStatic:0}),t.Lb(603979776,14,{_placeholderChild:0}),t.Lb(603979776,15,{_errorChildren:1}),t.Lb(603979776,16,{_hintChildren:1}),t.Lb(603979776,17,{_prefixChildren:1}),t.Lb(603979776,18,{_suffixChildren:1}),(l()(),t.tb(46,0,null,1,7,"input",[["class","mat-input-element mat-form-field-autofill-control"],["matInput",""],["placeholder","\u0628\u0646\u0648\u06cc\u0633"],["style","width:100%"],["type","text"]],[[2,"mat-input-server",null],[1,"id",0],[1,"placeholder",0],[8,"disabled",0],[8,"required",0],[1,"readonly",0],[1,"aria-describedby",0],[1,"aria-invalid",0],[1,"aria-required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"keyup.enter"],[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"],[null,"focus"]],function(l,n,a){var u=!0,e=l.component;return"input"===n&&(u=!1!==t.Fb(l,47)._handleInput(a.target.value)&&u),"blur"===n&&(u=!1!==t.Fb(l,47).onTouched()&&u),"compositionstart"===n&&(u=!1!==t.Fb(l,47)._compositionStart()&&u),"compositionend"===n&&(u=!1!==t.Fb(l,47)._compositionEnd(a.target.value)&&u),"blur"===n&&(u=!1!==t.Fb(l,51)._focusChanged(!1)&&u),"focus"===n&&(u=!1!==t.Fb(l,51)._focusChanged(!0)&&u),"input"===n&&(u=!1!==t.Fb(l,51)._onInput()&&u),"keyup.enter"===n&&(u=!1!==e.send()&&u),"ngModelChange"===n&&(u=!1!==(e.message=a)&&u),u},null,null)),t.sb(47,16384,null,0,S.d,[t.D,t.k,[2,S.a]],null,null),t.Kb(1024,null,S.k,function(l){return[l]},[S.d]),t.sb(49,671744,null,0,S.p,[[8,null],[8,null],[8,null],[6,S.k]],{model:[0,"model"]},{update:"ngModelChange"}),t.Kb(2048,null,S.l,null,[S.p]),t.sb(51,999424,null,0,P.b,[t.k,D.a,[6,S.l],[2,S.o],[2,S.h],k.b,[8,null],I.a,t.y],{placeholder:[0,"placeholder"],type:[1,"type"]},null),t.sb(52,16384,null,0,S.m,[[4,S.l]],null,null),t.Kb(2048,[[10,4],[11,4]],w.c,null,[P.b]),(l()(),t.tb(54,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),t.tb(55,0,null,0,4,"mat-card-actions",[["class","mat-card-actions"]],[[2,"mat-card-actions-align-end",null]],null,null,null,null)),t.sb(56,16384,null,0,p.b,[],null,null),(l()(),t.tb(57,0,null,null,2,"button",[["mat-button",""]],[[1,"disabled",0],[2,"_mat-animation-noopable",null]],[[null,"click"]],function(l,n,a){var t=!0;return"click"===n&&(t=!1!==l.component.send()&&t),t},s.d,s.b)),t.sb(58,180224,null,0,c.b,[t.k,b.h,[2,m.a]],null,null),(l()(),t.Nb(-1,0,["\u0628\u0641\u0631\u0633\u062a"]))],function(l,n){var a=n.component;l(n,28,0,"",a.chats),l(n,30,0,"chts","\u067e\u06cc\u0627\u0645 \u0647\u0627",""),l(n,49,0,a.message),l(n,51,0,"\u0628\u0646\u0648\u06cc\u0633","text")},function(l,n){l(n,14,1,["standard"==t.Fb(n,15).appearance,"fill"==t.Fb(n,15).appearance,"outline"==t.Fb(n,15).appearance,"legacy"==t.Fb(n,15).appearance,t.Fb(n,15)._control.errorState,t.Fb(n,15)._canLabelFloat,t.Fb(n,15)._shouldLabelFloat(),t.Fb(n,15)._hasFloatingLabel(),t.Fb(n,15)._hideControlPlaceholder(),t.Fb(n,15)._control.disabled,t.Fb(n,15)._control.autofilled,t.Fb(n,15)._control.focused,"accent"==t.Fb(n,15).color,"warn"==t.Fb(n,15).color,t.Fb(n,15)._shouldForward("untouched"),t.Fb(n,15)._shouldForward("touched"),t.Fb(n,15)._shouldForward("pristine"),t.Fb(n,15)._shouldForward("dirty"),t.Fb(n,15)._shouldForward("valid"),t.Fb(n,15)._shouldForward("invalid"),t.Fb(n,15)._shouldForward("pending"),!t.Fb(n,15)._animationsEnabled]),l(n,25,1,[t.Fb(n,30)._isServer,t.Fb(n,30).id,t.Fb(n,30).placeholder,t.Fb(n,30).disabled,t.Fb(n,30).required,t.Fb(n,30).readonly&&!t.Fb(n,30)._isNativeSelect||null,t.Fb(n,30)._ariaDescribedby||null,t.Fb(n,30).errorState,t.Fb(n,30).required.toString(),t.Fb(n,31).ngClassUntouched,t.Fb(n,31).ngClassTouched,t.Fb(n,31).ngClassPristine,t.Fb(n,31).ngClassDirty,t.Fb(n,31).ngClassValid,t.Fb(n,31).ngClassInvalid,t.Fb(n,31).ngClassPending]),l(n,35,1,["standard"==t.Fb(n,36).appearance,"fill"==t.Fb(n,36).appearance,"outline"==t.Fb(n,36).appearance,"legacy"==t.Fb(n,36).appearance,t.Fb(n,36)._control.errorState,t.Fb(n,36)._canLabelFloat,t.Fb(n,36)._shouldLabelFloat(),t.Fb(n,36)._hasFloatingLabel(),t.Fb(n,36)._hideControlPlaceholder(),t.Fb(n,36)._control.disabled,t.Fb(n,36)._control.autofilled,t.Fb(n,36)._control.focused,"accent"==t.Fb(n,36).color,"warn"==t.Fb(n,36).color,t.Fb(n,36)._shouldForward("untouched"),t.Fb(n,36)._shouldForward("touched"),t.Fb(n,36)._shouldForward("pristine"),t.Fb(n,36)._shouldForward("dirty"),t.Fb(n,36)._shouldForward("valid"),t.Fb(n,36)._shouldForward("invalid"),t.Fb(n,36)._shouldForward("pending"),!t.Fb(n,36)._animationsEnabled]),l(n,46,1,[t.Fb(n,51)._isServer,t.Fb(n,51).id,t.Fb(n,51).placeholder,t.Fb(n,51).disabled,t.Fb(n,51).required,t.Fb(n,51).readonly&&!t.Fb(n,51)._isNativeSelect||null,t.Fb(n,51)._ariaDescribedby||null,t.Fb(n,51).errorState,t.Fb(n,51).required.toString(),t.Fb(n,52).ngClassUntouched,t.Fb(n,52).ngClassTouched,t.Fb(n,52).ngClassPristine,t.Fb(n,52).ngClassDirty,t.Fb(n,52).ngClassValid,t.Fb(n,52).ngClassInvalid,t.Fb(n,52).ngClassPending]),l(n,55,0,"end"===t.Fb(n,56).align),l(n,57,0,t.Fb(n,58).disabled||null,"NoopAnimations"===t.Fb(n,58)._animationMode)})}function q(l){return t.Pb(0,[(l()(),t.tb(0,0,null,null,1,"app-chat",[],null,null,null,x,M)),t.sb(1,114688,null,0,i,[N.a,o.a,t.h],null,null)],function(l,n){l(n,1,0)},null)}var E=t.pb("app-chat",i,q,{},{},[]),O=a("POq0"),A=a("cUpR");a.d(n,"PagesModuleNgFactory",function(){return K});var K=t.qb(r,[],function(l){return t.Cb([t.Db(512,t.j,t.bb,[[8,[d.a,C,E]],[3,t.j],t.w]),t.Db(4608,f.m,f.l,[t.t,[2,f.D]]),t.Db(4608,O.c,O.c,[]),t.Db(4608,k.b,k.b,[]),t.Db(4608,S.u,S.u,[]),t.Db(1073742336,f.c,f.c,[]),t.Db(1073742336,L.a,L.a,[]),t.Db(1073742336,k.l,k.l,[[2,k.d],[2,A.f]]),t.Db(1073742336,p.e,p.e,[]),t.Db(1073742336,D.b,D.b,[]),t.Db(1073742336,k.v,k.v,[]),t.Db(1073742336,c.c,c.c,[]),t.Db(1073742336,O.d,O.d,[]),t.Db(1073742336,w.d,w.d,[]),t.Db(1073742336,I.c,I.c,[]),t.Db(1073742336,P.c,P.c,[]),t.Db(1073742336,S.t,S.t,[]),t.Db(1073742336,S.i,S.i,[]),t.Db(1073742336,N.r,N.r,[[2,N.w],[2,N.o]]),t.Db(1073742336,r,r,[]),t.Db(1024,N.m,function(){return[[{path:"home",component:e},{path:"chat/:id",component:i}]]},[])])})}}]);