define([
    'jquery', '../../../fluid-simulation-engine/geometry/Vector',
    '../../../fluid-simulation-engine/base/Body',
], function($, Vector, Body) {
    return {
        changeTerrain: function(world) {
           var newWall = [
               new Vector(0, 0)
             , new Vector(100, 0)
             , new Vector(100, 400)
             , new Vector(0, 400)
           ];
           world.addBody(new Body(newWall).setCoords(new Vector(1200, 200)));
        }
    }   
});