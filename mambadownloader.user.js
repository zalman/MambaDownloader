// ==UserScript==
// @name Mamba download photos
// @namespace wolf-et.ru
// @version 0.2
// @source wolf-et.ru
// @author #Wolf#
// @description Adds a download button for photos
// @include *mamba.ru*
// @include *love.mail.ru*
// @include *love.rambler.ru*
// ==/UserScript==
var g;
function parse_id() {
    var id = /photo_id\=(\d+)/gi.exec(window.location.href);
    return id[1];
}

function parse_div(d) {
    var my1 = /(\d+)_huge/gi.exec(d);
    return my1[1];
}

function clurl(im) {
    var my2 = /url\("?(.+?)"?\)/gi.exec(im);
    if (my2 != null) return my2[1];
}
function byClass(matchClass){
    if (!document.getElementsByClassName){
        var elements = document.getElementsByTagName('a'),
            i=0,
            nodeList = [],
            reg = new RegExp('(^|\\s)' + matchClass + '(\\s|$)')

        for (i=0; i < elements.length;i++)
        {
            if(elements[i].className.match(reg) !== null){
                 nodeList.push(elements[i]);
            }
        }
        return nodeList;
    }else{
        return document.getElementsByClassName(matchClass);
    }
}
if (/album_photos/gi.test(window.location)) {
var a = document.createElement('a');
	a.id='dwn';
	a.style.zIndex=101;
	a.style.position='absolute';
	a.style.cursor='pointer';
	a.style.top='5px';
	a.style.right='50px';
var i = document.createElement('i');
	i.style.width='20px';
	i.style.height='20px';
	i.style.position='absolute';
	i.style.backgroundImage='url(data:image/png;base64,R0lGODlhFAAUAIAAAP///7nTACH5BAAAAAAALAAAAAAUABQAAAI2BIKpG3YM1Yu0Wumyo2825Eng2EVlcjKdNkLh8pKa8bnNfMQfnpv3XFNVdLzM5YiEJVG0pKEAADs%3D)';

	a.appendChild(i);

	var cl=byClass('layer-close')[0];
	cl.parentNode.insertBefore(a);

    document.getElementById('dwn').onclick = function() {

        var els=byClass('line')[0].childNodes[0].childNodes;
		var cnt=els.length;
		var id=parse_id();
		for(j=0;j<cnt;j++){
			var tmp=els[j].getAttribute('style');
			if (/_huge/gi.test(tmp))
				if (id == parse_div(tmp))
					if(g=clurl(tmp)){
						window.open(g);
						break;
					}
        };
    }
}
