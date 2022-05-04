import React from 'react';
export default function Html<T>({
    title,
    cssEntry,
    children,
}: {
    title: string;
    cssEntry: string;
} & React.PropsWithChildren<T>) {
    return (
        <html>
            <head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <link rel="stylesheet" href={cssEntry} />
                <title>{title}</title>
            </head>
            <body>
                <noscript
                    dangerouslySetInnerHTML={{
                        __html: '<b>Enable JavaScript to run this app.</b>',
                    }}
                />
                <div id="root">{children}</div>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `!function(e){var r="currentScript";r in e||Object.defineProperty(e,r,{get:function(){try{throw new Error}catch(f){var r,t,n,i=0,c=/.*at [^(]*((.*):(.+):(.+))$/gi.exec(f.stack),a=c&&c[1]||!1,o=c&&c[2]||!1,u=e.location.href.replace(e.location.hash,""),l=e.getElementsByTagName("script");for(a===u&&(r=e.documentElement.outerHTML,t=new RegExp("(?:[^\\n]+?\\n){0,"+(o-2)+"}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*","i"),n=r.replace(t,"$1").trim());i<l.length;i++){if("interactive"===l[i].readyState)return l[i];if(l[i].src===a)return l[i];if(a===u&&l[i].innerHTML&&l[i].innerHTML.trim()===n)return l[i]}return null}}})}(document);`,
                    }}
                />
            </body>
        </html>
    );
}
