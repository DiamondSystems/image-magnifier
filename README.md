# image-magnifier

> Operates based on [jQuery framework](http://jquery.com/ "jQuery")

##The use and configuration
```javascript
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script src="image-magnifier.min.js"></script>
<script type="text/javascript">
// Load Image Magnifier
$('.yourImageBlock > img').imageMagnifier({
    magPercent    : 100,      // Magnifier percent (default: 100%)
    magPosition   : 'right',  // Magnifier position (default: 'right')[top, bottom, left, right]
    magIndent     : 10,       // Magnifier indent (default: 10)
    cursorWidth   : 0,        // Cursor width (default: 0)(if 'cursorPercent' is not specified)
    cursorHeight  : 0,        // Cursor height (default: 0)(if 'cursorPercent' is not specified)
    cursorPercent : 45,       // Cursor percent (default: 45)('cursorWidth' and 'cursorHeight' is set automatically on the percentage of image)
    cursorType    : 'pointer' // Cursor Type CSS Style name (default: 'pointer')[default, crosshair, move, pointer, etc]
});
</script>
```

## Frontend blocks and attributes
Create a script Image Magnifier. To create your own styles and properties
```html
<div class="dd_image_magnifier_cursor"></div><!-- Cursor block -->
<div class="dd_image_magnifier_block"></div><!-- Magnifier block -->
```

## Example of use
Examples are shown in the "[examples/index.html](https://github.com/DevDiamondCom/image-magnifier/blob/master/examples/index.html "")"

## License
Copyright (C) 2016 DevDiamond. (email : me@devdiamond.com)

GPLv3 or later - http://www.gnu.org/licenses/gpl-3.0.html