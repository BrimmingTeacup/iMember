window.addEventListener("load", (event)=>{

    const memberArray = ['AT-ATs', 'Ghostbusters', 'Slimer', 'Spock', 'tricorders',
    'Bionic Man', 'the millennium Falcon', 'TIE Fighters', 'Jawas',
    'Jurassic Park', 'Jeff Goldblum', 'Star Destroyers', 'Tattooine',
    'the torture droid', 'Goonies', 'Chunk', 'the trash compactor',
    'the Dagobah System', 'Yoda', 'Corellian Corvette', 'Lando Calrissian',
    'Tauntauns', 'the Rancor', 'Mos Eisley', 'Bespin', 'Wedge', 'Mon Mothma',
    'the rebel transports', 'the Death Star blowing up Alderaan', 'the Cloud City',
    'IG-88, the bounty hunter droid', 'Jaba the Hutt', 'the Battle of Endor',
    'the Ewok village', 'when Han shot Greedo', 'the Tantive IV', 'The Fugitive',
    'Aliens', 'snowspeeders', 'the Invasion of Hoth', '"You Rebel Scum!"',
    'the Death Star', 'cutting open Tauntauns', 'The Force', 'Stormtroopers']
    const memberFunction = () => {
        let randomNumber = Math.floor(Math.random() * memberArray.length);
        console.log(randomNumber)
        return `Member ${memberArray[randomNumber]}?`
    };

    const thoughtRight = document.getElementById('words-right')
    const thoughtLeft = document.getElementById('words-left')

    let thoughtRightVar = memberFunction();
    let thoughtLeftVar = memberFunction()

    while (thoughtRightVar === thoughtLeftVar) {
        thoughtLeftVar = memberFunction()
    }

    thoughtRight.innerHTML = thoughtRightVar
    thoughtLeft.innerHTML = thoughtLeftVar

    document.querySelectorAll('.logout-button')[0].setAttribute('hidden', 'true')
    //make dynamic

})
