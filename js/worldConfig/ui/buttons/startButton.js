define(
  [
    'jquery',
    '../../../fluid-simulation-engine/base/Particle',
    '../../../fluid-simulation-engine/base/WaterParticle',
    '../../../fluid-simulation-engine/geometry/Vector'
  ], function ($, Particle, WaterParticle, Vector) {
    return {
      startSimulation: function (world) {
        var numParticles = $('#inputParticle').val();
        if (numParticles < 100) { numParticles = 100; }
        else if (numParticles > 4000) { numParticles = 4000; }

        world.clearParticles();
        //cols,rows, x, y, type
        world.addParticlesGrid(numParticles / 50, 50, 130, 990, WaterParticle);

        var minPoint = world.getBodiesMinPoint();
        var maxPoint = world.getBodiesMaxPoint();
        world.setOutOfBoundsBehaviour(new Vector(650, 200), function (particle) {
          if (particle.coords.y > maxPoint.y || particle.coords.y < minPoint.y || particle.coords.x > maxPoint.x || particle.coords.x < minPoint.x)
            return true;
          else
            return false;
        });
        world.setStatus(true);
      }
    }
  });