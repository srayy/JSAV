/**
* Module that contains the configurable settings panel implementation
* Depends on core.js
*/
(function($) {
  if (typeof JSAV === "undefined") { return; }
  var speedChoices = [5000, 3000, 1500, 1000, 500, 400, 300, 200, 100, 50];
  var speedSetting = function(jsav) {
    return function() {
      var $elem = $('<div class="jsavspeed">Animation speed: <input type="range" min="1" max="10" step="1"' +
          ' placeholder="Value between 1 (Slow) and 10 (Fast)." size="30"/></div>');
      $elem.find("input").change(function() {
        var speed = parseInt($(this).val(), 10);
        if (isNaN(speed) || speed < 1 || speed > 10) { return; }
        jsav.SPEED = speedChoices[speed-1];
      });
      return $elem;
    };
  };
  
  var Settings = function() {
      this.components = [];
    },
    sproto = Settings.prototype;
  sproto.show = function() {
    var $cont = $("<div class='jsavsettings'></div>"),
      that = this,
      $close = $('<button>Close</button>').click(function() {
        that.close();
      });
    for (var i = 0; i < this.components.length; i++) {
      $cont.append(this.components[i]);
    }
    $cont.append($close);
    
    this.dialog = JSAV.utils.dialog($cont, {title: "Settings"});
  };
  sproto.close = function() {
    if (this.dialog) {
      this.dialog.close();
    }
  };
  sproto.add = function(create) {
    // create should be a function that returns a DOM Element or jQuery object or HTML string
    this.components.push(create);
  };
  
  JSAV.init(function() {
    this.settings = new Settings();
    this.settings.add(speedSetting(this));
    var s = this.settings;
    $(this.container).find(".jsavsettings").show().click(function(e) {
      e.preventDefault();
      s.show();
    });
  });
})(jQuery);