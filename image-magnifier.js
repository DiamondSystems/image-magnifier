/**
 * Image magnifier (jQuery Plugin)
 *
 * @link      https://github.com/DevDiamondCom/image-magnifier
 * @author    DevDiamond <me@devdiamond.com>
 * @copyright (c) 2016 DevDiamond. (email : me@devdiamond.com)
 * @licence   GPLv3 or later - http://www.gnu.org/licenses/gpl-3.0.html
 * @version   1.0.1
 */
(function($, document, undefined)
{
    // Image Magnifier jQuery Plugin
    $.fn.imageMagnifier = function(opts)
    {
        // Options
        var defaults = {
            magPercent      : 100,
            magPosition     : 'right', // (top, bottom, left, right)
            magIndent       : 10,
            cursorWidth     : 0,
            cursorHeight    : 0,
            cursorPercent   : 45,
            cursorType      : 'pointer', // Cursor Type CSS Style name (default, crosshair, move, pointer, etc)
            minDisplayWidth : 0          // Min display width on the px
        };
        opts = $.extend(defaults, opts || {});

        opts.imgExpr = this.selector;

        // Ready Document
        $(document).ready(function()
        {
            // Cache
            var is_magBlock  = false,
                magClassName = 'dd_image_magnifier_block',
                magClass     = '.'+ magClassName,
                magDivClass  = magClass +' > div',
                magImgClass  = magDivClass +' > img',
                curClassName = 'dd_image_magnifier_cursor',
                curClass     = '.'+ curClassName,
                obj_body     = $('body'),
                imgTop       = 0,
                imgLeft      = 0,
                imgRight     = 0,
                imgBottom    = 0,
                magImgWidth  = 0,
                magImgHeight = 0,
                magImgTop    = 0,
                magImgLeft   = 0,
                cursorTop    = 0,
                cursorLeft   = 0;

            // Mag. Percent
            opts.magPercent = parseFloat(opts.magPercent);
            if ( opts.magPercent < 1 )
                opts.magPercent = 100;

            // Mag. Position
            if ( $.inArray( opts.magPosition, ['top', 'bottom', 'left', 'right'] ) === -1 )
                opts.magPosition = 'right';

            // Mag. Indent
            opts.magIndent = parseInt(opts.magIndent);

            // Mag. Cursor
            opts.cursorPercent   = parseFloat(opts.cursorPercent);
            opts.cursorWidth     = parseInt(opts.cursorWidth);
            opts.cursorHeight    = parseInt(opts.cursorHeight);
            opts.minDisplayWidth = parseInt(opts.minDisplayWidth);
            if ( opts.cursorWidth < 1 )
                opts.cursorWidth = 100;
            if ( opts.cursorHeight < 1 )
                opts.cursorHeight = 100;
            if ( opts.cursorType == '' )
                opts.cursorType = 'pointer';
            if ( opts.minDisplayWidth < 0 )
                opts.minDisplayWidth = 0;

            var mag = {
                //Mag. cursor coordinate
                cursor_coordinate: function( ePageX, ePageY )
                {
                    cursorTop  = ePageY - (opts.cursorHeight / 2);
                    cursorLeft = ePageX - (opts.cursorWidth / 2);

                    if ( cursorTop < imgTop )
                        cursorTop = imgTop;
                    else if ( (cursorTop + opts.cursorHeight) > imgBottom )
                        cursorTop = (imgBottom - opts.cursorHeight);

                    if ( cursorLeft < imgLeft )
                        cursorLeft = imgLeft;
                    else if ( (cursorLeft + opts.cursorWidth) > imgRight )
                        cursorLeft = (imgRight - opts.cursorWidth);
                },

                //Mag. image coordinate
                image_coordinate: function()
                {
                    magImgTop  = imgTop - cursorTop;
                    magImgTop  = magImgTop + ((magImgTop * opts.magPercent) / 100);
                    magImgLeft = imgLeft - cursorLeft;
                    magImgLeft = magImgLeft + ((magImgLeft * opts.magPercent) / 100);
                },

                // Is display show
                is_display: function()
                {
                    if ( opts.minDisplayWidth > $(window).width() )
                    {
                        if ( is_magBlock )
                        {
                            is_magBlock = false;
                            $(magClass).stop().fadeOut(150);
                            $(curClass).stop().fadeOut(150);
                        }
                        return false;
                    }
                    return true;
                }
            };

            // Image Mousemove Action
            $(document).on('mousemove', opts.imgExpr, function(e)
            {
                if ( ! mag.is_display() || is_magBlock || e.target.src == '' || typeof(e.target.src) === "undefined" )
                    return;

                // Current Image coordinate
                imgTop    = (e.pageY - e.offsetY) + parseFloat( $(this).css("padding-top") );
                imgLeft   = (e.pageX - e.offsetX) + parseFloat( $(this).css("padding-left") );
                imgRight  = (imgLeft + e.target.width);
                imgBottom = (imgTop + e.target.height);

                // Check coordinate
                if ( e.pageY < imgTop || e.pageY > imgBottom || e.pageX < imgLeft || e.pageX > imgRight)
                    return;

                // Mag. cursor coordinate
                if ( opts.cursorPercent > 0 )
                {
                    opts.cursorWidth = (e.target.width * opts.cursorPercent) / 100;
                    opts.cursorHeight = (e.target.height * opts.cursorPercent) / 100;
                }
                mag.cursor_coordinate( e.pageX, e.pageY );

                // Mag. block coordinate
                var magW    = (opts.cursorWidth + ((opts.cursorWidth * opts.magPercent) / 100)),
                    magH    = (opts.cursorHeight + ((opts.cursorHeight * opts.magPercent) / 100)),
                    magTop  = imgTop,
                    magLeft = imgLeft;

                switch (opts.magPosition)
                {
                    case 'top':
                        magTop  = (imgTop - opts.magIndent - magH);
                        break;
                    case 'bottom':
                        magTop  = (imgBottom + opts.magIndent);
                        break;
                    case 'left':
                        magLeft = (imgLeft - opts.magIndent - magW);
                        break;
                    case 'right':
                        magLeft = (imgRight + opts.magIndent);
                        break;
                }

                // Mag. Image sizes
                magImgWidth  = e.target.width + ((e.target.width * opts.magPercent) / 100);
                magImgHeight = e.target.height + ((e.target.height * opts.magPercent) / 100);

                mag.image_coordinate();

                // Create Mag. Cursor
                if ( $(curClass).stop().length == 0)
                {
                    obj_body.append('<div class="'+ curClassName + '" style="display: none; background: #fff; opacity: 0.4; ' +
                        'cursor: '+ opts.cursorType +'; border: 1px solid #999;"></div>');
                }
                $(curClass).css({
                    'width':    opts.cursorWidth +'px',
                    'height':   opts.cursorHeight +'px',
                    'position': 'absolute',
                    'top':      cursorTop,
                    'left':     cursorLeft,
                    'z-index':  992
                }).fadeIn(150);

                // Create Mag. Block
                if ( $(magClass).stop().length == 0)
                {
                    obj_body.append('<div class="'+ magClassName + '" style="display: none; border: 1px solid #999;">' +
                        '<div style="display: block; position: relative;"><img src="'+ e.target.src +'"/></div></div>');
                }
                $(magImgClass).attr({'src':e.target.src}).css({
                    'width':    magImgWidth +'px',
                    'height':   magImgHeight +'px',
                    'position': 'absolute',
                    'top':      magImgTop,
                    'left':     magImgLeft
                });
                $(magClass).css({
                    'width':    magW +'px',
                    'height':   magH +'px',
                    'position': 'absolute',
                    'overflow': 'hidden',
                    'top':      magTop,
                    'left':     magLeft,
                    'z-index':  991
                }).fadeIn(150);

                // Save fixation
                is_magBlock = true;
            });

            // Mag. Cursor MouseMove Action
            $(document.body).on('mousemove', curClass, function(e)
            {
                if ( ! mag.is_display() )
                    return;

                mag.cursor_coordinate( e.pageX, e.pageY );
                $(curClass).css({
                    'width':    opts.cursorWidth +'px',
                    'height':   opts.cursorHeight +'px',
                    'top':      cursorTop,
                    'left':     cursorLeft
                });

                mag.image_coordinate();
                $(magImgClass).attr({'src':e.target.src}).css({
                    'width':    magImgWidth +'px',
                    'height':   magImgHeight +'px',
                    'top':      magImgTop,
                    'left':     magImgLeft
                });
            });

            // Mag. Cursor MouseOut Action
            $(document.body).on('mouseout', curClass, function()
            {
                if ( ! mag.is_display() )
                    return;

                is_magBlock = false;
                $(magClass).stop().fadeOut(150);
                $(curClass).stop().fadeOut(150);
            });
        });
    };
})(jQuery, document);
