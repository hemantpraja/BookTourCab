
var long_term_booking_btn = document.getElementById("long-term-booking-btn");
console.log(long_term_booking_btn);
long_term_booking_btn.addEventListener("ckick",()=>{
    // alert("hi")
    window.location.href="vehicle_booking_page"
});

var driver_dashboard_button = document.getElementById("short-term-booking-btn");

driver_dashboard_button.addEventListener("click",()=>{
    window.location.href="driver_dashboard";
});







// --------------------------

let magicParticles = [];
        let stars = [];

        function setup() {
            let canvas = createCanvas(windowWidth, windowHeight);
            canvas.parent("star-card");

            for (let i = 0; i < 200; i++) {
                let star = new Star();
                stars.push(star);
            }

            demo();
        }

        function demo() {
            const centerX = windowWidth / 2;
            const centerY = windowHeight / 2;
            const radius = Math.min(windowWidth, windowHeight) / 4;
            const duration = 1500;

            const startAngle = 0;
            const endAngle = 2 * Math.PI;
            const step = (endAngle - startAngle) / duration;

            let elapsedTime = 0;

            function updateMousePosition() {
                const angle = startAngle + elapsedTime * step;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;
                const event = new MouseEvent('mousemove', {
                    clientX: x,
                    clientY: y,
                    bubbles: true,
                    cancelable: true
                });
                document.dispatchEvent(event);
            }

            const interval = setInterval(() => {
                updateMousePosition();
                elapsedTime += 16; // 16ms = 1 frame at 60fps
                if (elapsedTime >= duration) {
                    clearInterval(interval);
                }
            }, 16);
        }


        function draw() {
            clear();

            for (let i = 0; i < stars.length; i++) {
                stars[i].update();
                stars[i].display();
            }

            for (let i = magicParticles.length - 1; i >= 0; i--) {
                let particle = magicParticles[i];
                particle.update();
                particle.display();

                if (particle.opacity <= 0) {
                    magicParticles.splice(i, 1);
                }
            }
        }

        function mouseMoved() {
            addMagicParticle(mouseX, mouseY);
        }

        function touchMoved() {
            if (touches.length > 0) {
                let touch = touches[0];
                addMagicParticle(touch.x, touch.y);
            }
        }

        function addMagicParticle(x, y) {
            if (x >= 0 && y >= 0 && x <= width && y <= height) {
                let particle = new MagicParticle(x, y);
                magicParticles.push(particle);
            }
        }

        class MagicParticle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = random(10, 30);
                this.baseColor = color(
                    random([
                        "#00fffc", "#00fff0",
                        "#068ec7", "#ecaa14",
                        "#f91717", "#f611ae",
                        "#11f639", "#088592",
                        "#46aff3"])
                );

                this.color = this.baseColor;
                this.rotation = random(TWO_PI);
                this.speed = random(1, 3);
                this.opacity = 155;
                this.fadeOutRate = random(1, 3);
                this.shapeType = "star"; // Set to star shape
                this.sparkles = [];
                this.shimmer = random(0.3, 0.8);
                this.shimmerSpeed = random(0.005, 0.02);
            }

            update() {
                this.x += cos(this.rotation) * this.speed;
                this.y += sin(this.rotation) * this.speed;
                this.opacity -= this.fadeOutRate;

                this.updateSparkles();
                this.updateColor();
            }

            updateSparkles() {
                for (let i = this.sparkles.length - 1; i >= 0; i--) {
                    let sparkle = this.sparkles[i];
                    sparkle.update();
                    if (sparkle.opacity <= 0) {
                        this.sparkles.splice(i, 1);
                    }
                }
            }

            updateColor() {
                let shimmerVal = sin(frameCount * this.shimmerSpeed);
                let shimmerColor = lerpColor(this.baseColor, color(255), shimmerVal);
                let sparkleColor = lerpColor(shimmerColor, color(255), this.opacity / 255);
                this.color = lerpColor(sparkleColor, this.baseColor, this.shimmer);
            }

            display() {
                noStroke();
                fill(this.color, this.opacity);
                push();
                translate(this.x, this.y);
                rotate(frameCount * 0.02);
                let shapeSize = this.size * 0.6;
                if (this.shapeType === "circle") {
                    ellipse(0, 0, shapeSize, shapeSize);
                } else if (this.shapeType === "rect") {
                    rect(-shapeSize / 2, -shapeSize / 2, shapeSize, shapeSize, 5);
                } else if (this.shapeType === "star") {
                    // Call drawStar function to draw star shape
                    drawStar(0, 0, 5, 15, 5);
                }
                pop();

                for (let sparkle of this.sparkles) {
                    sparkle.display();
                }

                if (random() < 0.1) {
                    // Increased sparkle frequency
                    let sparkle = new Sparkle(this.x, this.y, this.color);
                    this.sparkles.push(sparkle);
                }
            }
        }

        class Sparkle {
            constructor(x, y, color) {
                this.x = x;
                this.y = y;
                this.size = random(2, 8); // Increased sparkle size
                this.color = color;
                this.opacity = 255;
                this.speedX = random(-1, 1);
                this.speedY = random(-1, 1);
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.opacity -= 10;
            }

            display() {
                noStroke();
                fill(this.color, this.opacity);
                ellipse(this.x, this.y, this.size, this.size);
            }
        }

        class Star {
            constructor() {
                this.x = random(width);
                this.y = random(height);
                this.size = random(1, 3);
                this.opacity = random(100, 255);
                this.twinkleSpeed = random(0.01, 0.03);
            }

            update() {
                let twinkleVal = sin(frameCount * this.twinkleSpeed);
                this.opacity = map(twinkleVal, -1, 1, 100, 255);
            }

            display() {
                noStroke();
                fill(255, this.opacity);
                ellipse(this.x, this.y, this.size, this.size);
            }
        }

        // Function to draw a star
        function drawStar(x, y, radius1, radius2, npoints) {
            let angle = TWO_PI / npoints;
            let halfAngle = angle / 2.0;
            beginShape();
            for (let a = -PI / 2; a < TWO_PI - PI / 2; a += angle) {
                let sx = x + cos(a) * radius2;
                let sy = y + sin(a) * radius2;
                vertex(sx, sy);
                sx = x + cos(a + halfAngle) * radius1;
                sy = y + sin(a + halfAngle) * radius1;
                vertex(sx, sy);
            }
            endShape(CLOSE);
        }