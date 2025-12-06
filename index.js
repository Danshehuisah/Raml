document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
    const sidenav = document.getElementById("mySidenav");
    const main = document.getElementById("main");
    const overlay = document.getElementById("overlay");
    const menuButton = document.getElementById("menuButton");

    // Navigation functions
    function openNav() {
        sidenav.classList.add("open");
        main.classList.add("push");
        overlay.style.display = "block";
        document.body.style.overflow = "hidden";
    }

    function closeNav() {
        sidenav.classList.remove("open");
        main.classList.remove("push");
        overlay.style.display = "none";
        document.body.style.overflow = "auto";
    }

    // Toggle navigation
    menuButton.addEventListener('click', function(e) {
        if (sidenav.classList.contains("open")) {
            closeNav();
        } else {
            openNav();
        }
        e.stopPropagation();
    });

    // Close nav when clicking overlay
    overlay.addEventListener('click', closeNav);

    // Close nav when clicking anywhere outside
    document.addEventListener('click', function(e) {
        if (sidenav.classList.contains("open") && 
            !sidenav.contains(e.target) && 
            !menuButton.contains(e.target)) {
            closeNav();
        }
    });

    // Rest of your existing code for boxes and lines...
    const boxes = [
        document.getElementById('boxOne'),
        document.getElementById('boxTwo'),
        document.getElementById('boxThree'),
        document.getElementById('boxFour')
    ];
    
    const lines = [
        document.getElementById('lineOne'),
        document.getElementById('lineTwo'),
        document.getElementById('lineThree'),
        document.getElementById('lineFour')
    ];
    
    let currentBoxIndex = 0;
    let clickedLines = new Array(lines.length).fill(false);
    let clickCounts = new Array(lines.length).fill(0);
    let allBoxesFilled = false;

    // Delete button functionality
    document.getElementById('deleteBtn').addEventListener('click', function() {
        if (confirm('Are you sure you want to clear all boxes?')) {
            boxes.forEach(box => box.innerHTML = '');
            lines.forEach(line => {
                line.querySelectorAll('.dot, .dash').forEach(el => el.remove());
                line.classList.remove('disabled');
            });
            clickedLines = new Array(lines.length).fill(false);
            clickCounts = new Array(lines.length).fill(0);
            document.getElementById('generateBtn').disabled = true;
            currentBoxIndex = 0;
            allBoxesFilled = false;
            
            for (let i = 1; i <= 4; i++) {
                localStorage.removeItem(`box${i}Results`);
            }
            
            const existingViewBtn = document.getElementById('viewResultsBtn');
            if (existingViewBtn) {
                existingViewBtn.remove();
            }
        }
    });

    // Add dots to lines when clicked
    lines.forEach((line, index) => {
        line.addEventListener('click', function(e) {
            if (allBoxesFilled) return;
            
            const dot = document.getElementById('dotTemplate').cloneNode(true);
            dot.style.display = 'block';
            dot.style.position = 'absolute';
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - 5;
            const y = e.clientY - rect.top - 5;
            
            dot.style.left = `${x}px`;
            dot.style.top = `${y}px`;
            
            this.appendChild(dot);
            clickCounts[index]++;
            clickedLines[index] = true;
            
            if (clickedLines.every(line => line)) {
                document.getElementById('generateBtn').disabled = false;
            }
        });
    });
    
    document.getElementById('generateBtn').disabled = true;
    
    document.getElementById('generateBtn').addEventListener('click', function() {
        if (currentBoxIndex > boxes.length - 1) {
            alert('All boxes are filled!');
            return;
        }
        
        if (!clickedLines.every(line => line)) {
            alert('Please click on all lines at least once!');
            return;
        }
        
        const currentBox = boxes[currentBoxIndex];
        currentBox.innerHTML = '';
        currentBox.style.display = 'flex';
        currentBox.style.flexDirection = 'column';
        currentBox.style.alignItems = 'center';
        currentBox.style.justifyContent = 'center';
        currentBox.style.gap = '5px';
        
        const boxResults = clickCounts.map(count => count % 2 === 1 ? 'dot' : 'dash');
        
        const symbolContainer = document.createElement('div');
        symbolContainer.style.display = 'flex';
        symbolContainer.style.flexDirection = 'column';
        symbolContainer.style.alignItems = 'center';
        symbolContainer.style.justifyContent = 'center';
        symbolContainer.style.gap = '5px';
        currentBox.appendChild(symbolContainer);
        
        boxResults.forEach(result => {
            const symbol = document.createElement('div');
            symbol.className = result === 'dot' ? 'dot' : 'dash';
            symbolContainer.appendChild(symbol);
        });
        
        localStorage.setItem(`box${currentBoxIndex + 1}Results`, JSON.stringify(boxResults));
        
        lines.forEach(line => {
            line.querySelectorAll('.dot, .dash').forEach(el => el.remove());
            
            if (currentBoxIndex === boxes.length - 1) {
                line.classList.add('disabled');
                allBoxesFilled = true;
            }
        });
        
        clickedLines = new Array(lines.length).fill(false);
        clickCounts = new Array(lines.length).fill(0);
        document.getElementById('generateBtn').disabled = true;
        
        currentBoxIndex++;
        
        if (currentBoxIndex === boxes.length) {
            const viewButton = document.createElement('button');
            viewButton.id = 'viewResultsBtn';
            viewButton.textContent = 'View Results';
            viewButton.addEventListener('click', function() {
                window.location.href = 'vew.html';
            });
            
            document.getElementById('container').appendChild(viewButton);
        }
    });
});