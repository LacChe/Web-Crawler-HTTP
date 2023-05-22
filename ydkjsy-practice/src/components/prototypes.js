import React from 'react'

const prototypes = () => {

    function randMax(max) {
        return Math.trunc(1E9 * Math.random()) % max;
    }
    
    var reel = {
        symbols: [
            "♠", "♥", "♦", "♣", "☺", "★", "☾", "☀"
        ],
        spin() {
            if (this.position == null) {
                this.position = randMax(
                    this.symbols.length - 1
                );
            }
            this.position = (
                this.position + 100 + randMax(100)
            ) % this.symbols.length;
        },
        display() {
            if (this.position == null) {
                this.position = randMax(
                    this.symbols.length - 1
                );
            }
            return this.symbols[this.position];
        }
    };
    
    var slotMachine = {
        reels: [
            Object.create(reel),
            Object.create(reel),
            Object.create(reel),
        ],
        spin() {
            this.reels.forEach(function spinReel(reel){
                reel.spin();
            });
        },
        display() {
            let lineOneLeft = reel.symbols[(reel.symbols.length + this.reels[0].position - 1) % reel.symbols.length]
            let lineOneMiddle = reel.symbols[(reel.symbols.length + this.reels[1].position - 1) % reel.symbols.length]
            let lineOneRight = reel.symbols[(reel.symbols.length + this.reels[2].position - 1) % reel.symbols.length]
            
            let lineTwoLeft = reel.symbols[(reel.symbols.length + this.reels[0].position) % reel.symbols.length]
            let lineTwoMiddle = reel.symbols[(reel.symbols.length + this.reels[1].position) % reel.symbols.length]
            let lineTwoRight = reel.symbols[(reel.symbols.length + this.reels[2].position) % reel.symbols.length]
            
            let lineThreeLeft = reel.symbols[(reel.symbols.length + this.reels[0].position + 1) % reel.symbols.length]
            let lineThreeMiddle = reel.symbols[(reel.symbols.length + this.reels[1].position + 1) % reel.symbols.length]
            let lineThreeRight = reel.symbols[(reel.symbols.length + this.reels[2].position + 1) % reel.symbols.length]

            return `${lineOneLeft} | ${lineOneMiddle} | ${lineOneRight}\n${lineTwoLeft} | ${lineTwoMiddle} | ${lineTwoRight}\n${lineThreeLeft} | ${lineThreeMiddle} | ${lineThreeRight}`;
        }
    };

  return (
    <>
        <h2>Prototypes</h2>
        {slotMachine.spin()}
        <p style={{whiteSpace: 'pre'}}>{slotMachine.display()}</p>
        {slotMachine.spin()}
        <p style={{whiteSpace: 'pre'}}>{slotMachine.display()}</p>
    </>
  )
}

export default prototypes