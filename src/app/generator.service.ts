import {Injectable} from '@angular/core'
import {Coords} from './models/coords.model'
import {Moon} from './models/moon.model'
import {Planet} from './models/planet.model'
import {System} from './models/system.model'
import {Galaxy} from './models/galaxy.model'

@Injectable()
export class GeneratorService {

    constructor() {
    }

    generateGalaxy() {
        const numSystemsMin = 3
        const numSystemsMax = 8
        const systemDistanceMin = 300
        const systemDistanceMax = 600
        const systemDistance = 500 // being lazy at the moment

        const numPlanetsMin = 3
        const numPlanetsMax = 12
        const planetRadiusMin = 50
        const planetRadiusMax = 150
        const planetOrbitIncrementMin = 300
        const planetOrbitIncrementMax = 700

        const numMoonsMin = 0
        const numMoonsMax = 4
        const moonRadiusMin = 10
        const moonRadiusMax = 30
        const moonOrbitIncrementMin = 50
        const moonOrbitIncrementMax = 80

        // Generate systems
        const systems = []
        const numSystems = this.getRandomIntInclusive(numSystemsMin, numSystemsMax)

        for (let i = 0; i <= numSystems; i++) {
            const systemName = `s${i}`

            // Generate position of system in the galaxy view
            const systemX = this.getRandomIntInclusive(0, systemDistance + systemDistance) - systemDistance
            const systemY = this.getRandomIntInclusive(0, systemDistance + systemDistance) - systemDistance
            const systemZ = this.getRandomIntInclusive(0, systemDistance + systemDistance) - systemDistance

            // Generate planets
            const planets = []
            const numPlanets = this.getRandomIntInclusive(numPlanetsMin, numPlanetsMax)
            let planetDistanceFromSun = 0 // total distance between center of planet and center of sun

            for (let j = 0; j <= numPlanets; j++) {
                planetDistanceFromSun += this.getRandomIntInclusive(planetOrbitIncrementMin, planetOrbitIncrementMax)
                const planetName = `s${i}-p${j}`

                // Generate random position on the orbit
                // See http://math.stackexchange.com/a/253113/52104
                const planetAngle = Math.random() * Math.PI * 2
                const planetX = Math.cos(planetAngle) * planetDistanceFromSun
                const planetY = 0
                const planetZ = Math.sin(planetAngle) * planetDistanceFromSun
                const planetCoords = new Coords(planetX, planetY, planetZ)

                // Generate random radius
                const planetRadius = this.getRandomIntInclusive(0, planetRadiusMax - planetRadiusMin) + planetRadiusMin

                // Generate moons
                const moons = []
                const numMoons = this.getRandomIntInclusive(numMoonsMin, numMoonsMax)
                let moonDistanceFromPlanet = planetRadius

                for (let k = 0; k <= numMoons; k++) {
                    moonDistanceFromPlanet += this.getRandomIntInclusive(moonOrbitIncrementMin, moonOrbitIncrementMax)
                    const moonName = `s${i}-p${j}-m${k}`

                    // Generate random position on the orbit
                    const moonAngle = Math.random() * Math.PI * 2
                    const moonX = Math.cos(moonAngle) * moonDistanceFromPlanet
                    const moonY = 0
                    const moonZ = Math.sin(moonAngle) * moonDistanceFromPlanet
                    const moonCoords = new Coords(moonX + planetX, moonY + planetY, moonZ + planetZ)

                    // Generate random radius
                    const moonRadius = this.getRandomIntInclusive(0, moonRadiusMax - moonRadiusMin) + moonRadiusMin

                    moons.push(new Moon({
                        name: moonName,
                        coords: moonCoords,
                        radius: moonRadius,
                        distanceFromPlanet: moonDistanceFromPlanet
                    }))
                }

                planets.push(new Planet({
                    name: planetName,
                    coords: planetCoords,
                    radius: planetRadius,
                    distanceFromSun: planetDistanceFromSun,
                    moons: moons
                }))
            }

            systems.push(new System({
                name: systemName,
                coords: new Coords(systemX, systemY, systemZ),
                planets: planets
            }))
        }

        const galaxyName = `g${Date.now()}`
        return new Galaxy({name: galaxyName, systems: systems})
    }

    getRandomIntInclusive(min = 0, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    getRandomIntExclusive(min = 0, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min)) + min
    }
}
