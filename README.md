fs.poly
=======

A simple polyfill for the modern full screen API.

Bind to standard document events without vendor prefixes.

**Browser Support**
 - All modern browsers



*Support for older browsers (<= IE9) is simplistic. The requested element will have styling applied that creates the appearance of full screen. The events are still fired and the `document.fullscreenElement` is also maintained throughout.*

**Dependencies**
 - jQuery 1.7+

**Examples**

    var myElement = document.getElementById('myElement');
    
    $("#myToggle").on("click", () => {
    
      if(document.fullscreenElement) {
        document.exitFullscreen();
      }
      else {
        myElement.requestFullscreen();
      }
    });
    
**Events**
    
    $(document).on({
      "fullscreenchange": () => {
        //Request or exit has been called
      },
      "fullscreenerror": () => {
        //handle accordingly...
      }
    });
    
**Nuget**
https://www.nuget.org/packages/fs.poly/0.1.0
