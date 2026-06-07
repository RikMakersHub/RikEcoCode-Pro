/**
 * ==========================================================================
 * RikEcoCode Pro // Core Analytics Logic & Structural Exporter Engine
 * Architected by RikMakersHub Pro
 * ==========================================================================
 */

// Global memory space to store the transient generated code block
let generatedTemplate = "";

function runGreenAnalysis() {
    const code = document.getElementById('codeEditor').value;
    const cpuMhz = parseFloat(document.getElementById('cpuSpeed').value);
    const executions = parseInt(document.getElementById('loopExecutions').value) || 0;
    
    const adviceContainer = document.getElementById('adviceContainer');
    const diagnosticBadge = document.getElementById('diagnosticBadge');
    const exporterContainer = document.getElementById('exporterContainer');
    
    // FORCE RESET: Wipe the DOM containers and the template buffer on every execution click
    adviceContainer.innerHTML = '';
    exporterContainer.style.display = 'none'; 
    generatedTemplate = ""; 
    
    let totalWastedCyclesPerLoop = 0;
    let logs = [];
    
    // Default fallback boilerplate parameters (force refreshed inside the block)
    let extractedInterval = 1000; 
    let innerPayloadCode = "    // Your main non-blocking script actions execute here\n    // (e.g., refreshing sensor readings, pinging wireless nodes)\n";

    /* ==========================================================================
       Diagnostic Protocol 1: Advanced Blocking Delay & Code Segment Parsing
       ========================================================================== */
    const delayRegex = /delay\s*\(\s*(\d+)\s*\)/g;
    
    if (delayRegex.test(code)) {
        delayRegex.lastIndex = 0; // Reset tracking index pointer
        let delayCycles = 0;
        let match;
        
        while ((match = delayRegex.exec(code)) !== null) {
            const ms = parseInt(match[1]); // Extract captured parameter integers cleanly
            extractedInterval = ms;        // Set the final target window dynamically
            delayCycles += ms * (cpuMhz * 1000);
        }
        
        totalWastedCyclesPerLoop += delayCycles;
        logs.push({
            tag: 'State Overhead',
            class: 'tag-critical',
            title: 'Blocking Delay Commands Identified [delay()]',
            description: 'Forcing hard delays completely paralyzes the main processor thread, locking peripheral resource operations, I2C bus communications, and Wi-Fi transmission routines.',
            refactor: 'Transition blocking routines into non-blocking conditions utilizing raw millis() stopwatch comparison statements.'
        });

        // SMART EXTRACTION PIPELINE: Isolates the user's active code lines and strips out the garbage
        const codeLines = code.split(/\r?\n/);
        let dynamicPayloadLines = [];
        
        codeLines.forEach(line => {
            let cleanLine = line.trim();
            // Completely drop structural declarations, brackets, and delay hooks
            if (cleanLine && 
                !cleanLine.startsWith('void loop') && 
                !cleanLine.startsWith('//') && // Skips global comment overrides
                cleanLine !== '{' && 
                cleanLine !== '}' && 
                !/delay\s*\(/g.test(cleanLine)) {
                dynamicPayloadLines.push("    " + cleanLine);
            }
        });
        
        if (dynamicPayloadLines.length > 0) {
            innerPayloadCode = dynamicPayloadLines.join('\n') + '\n';
        }
    }

    /* ==========================================================================
       Diagnostic Protocol 2: Soft-Float Emulation Tracking Matrix
       ========================================================================== */
    const floatRegex = /float\s+[a-zA-Z0-9_]+/g;
    if (floatRegex.test(code) && (cpuMhz === 16 || cpuMhz === 80)) {
        totalWastedCyclesPerLoop += 4500;
        logs.push({
            tag: 'Compute Fault',
            class: 'tag-warning',
            title: 'Soft-Float Logic Pipeline Processing',
            description: 'The selected architecture relies on complex software routines to simulate decimal tracking paths, scaling clock execution steps.',
            refactor: 'Scale metrics dynamically and apply fixed-point integer types to bypass emulation overhead constraints.'
        });
    }

    /* ==========================================================================
       Diagnostic Protocol 3: Busy-Waiting Spin Lock Detection
       ========================================================================== */
    const pollingRegex = /while\s*\(\s*(digitalRead|analogRead)/g;
    if (pollingRegex.test(code)) {
        totalWastedCyclesPerLoop += 15000;
        logs.push({
            tag: 'Bus Polling',
            class: 'tag-efficiency',
            title: 'Active Hardware Pin Polling Loops',
            description: 'The thread is locked inside a tight checking iteration, forcing continuous maximum CPU power draw states while waiting for state transitions.',
            refactor: 'Eradicate continuous loop polling. Allocate hardware interrupts (attachInterrupt) to safely suspend execution loops.'
        });
    }

    /* ==========================================================================
       UI Document Rendering Matrix Execution
       ========================================================================== */
    if (logs.length > 0) {
        // Toggle badged elements to Alert state
        diagnosticBadge.innerText = "Overhead Caught";
        diagnosticBadge.style.backgroundColor = "#fef2f2";
        diagnosticBadge.style.color = "#b91c1c";
        diagnosticBadge.style.borderColor = "#fca5a5";
        
        logs.forEach(log => {
            const item = document.createElement('div');
            item.className = "log-item";
            item.innerHTML = `
                <div class="log-header">
                    <h4 class="log-title">${log.title}</h4>
                    <span class="log-tag ${log.class}">${log.tag}</span>
                </div>
                <p class="log-desc">${log.description}</p>
                <div class="refactor-box">
                    <span class="refactor-label">RikMakersHub Optimization Strategy:</span>
                    <p class="refactor-code">${log.refactor}</p>
                </div>
            `;
            adviceContainer.appendChild(item);
        });

        // Construct Custom Tailored Asynchronous Template with Robust Brackets
        generatedTemplate = 
`// Optimized Non-Blocking Code Template // Generated via RikEcoCode Pro
// Brand Identity Architecture: rikmakershub.github.io/RikMakersHub-Pro/

unsigned long previousTimeMarker = 0;
const long structuralInterval = ${extractedInterval}; // Extracted dynamically from your input code

void setup() {
  // Initialize your multi-node pin registers safely here
}

void loop() {
  unsigned long currentTimeMarker = millis(); // Background tracking stopwatch

  // Asynchronous non-blocking task condition block
  if (currentTimeMarker - previousTimeMarker >= structuralInterval) {
    previousTimeMarker = currentTimeMarker; // Instantly balance the baseline reference point
    
${innerPayloadCode}  } // Closes the asynchronous non-blocking task block safely

  // The main thread loop remains entirely unblocked!
  // Insert your continuous background data tracking routines or node streams below:
}`;

        // Turn on Exporter button layout block
        exporterContainer.style.display = 'block';

    } else {
        // Toggle badged elements to Verified success state
        diagnosticBadge.innerText = "Clean Matrix";
        diagnosticBadge.style.backgroundColor = "#f0fdf4";
        diagnosticBadge.style.color = "#166534";
        diagnosticBadge.style.borderColor = "#bbf7d0";
        
        adviceContainer.innerHTML = `
            <div class="empty-state">
                <span style="font-size: 1.5rem; display: block; margin-bottom: 0.25rem;">🏆</span>
                <h4 style="margin: 0 0 0.25rem 0; color: var(--dark);">Optimized Performance Signature Verified</h4>
                <p style="margin: 0; font-size: 0.75rem;">No blocking flags or processing leaks caught inside the target workspace loops.</p>
            </div>
        `;
    }

    /* ==========================================================================
       Telemetry Core Arithmetic Operations
       ========================================================================== */
    const savedDailyCycles = totalWastedCyclesPerLoop * executions;
    const hzSpeed = cpuMhz * 1000000;
    const executionTimeSavedSeconds = savedDailyCycles / hzSpeed;
    
    const nominalWatts = 0.264; // Benchmark base configuration (3.3V @ 80mA load)
    const energySavedMicroWh = (executionTimeSavedSeconds / 3600) * nominalWatts * 1000000;

    // Direct interface DOM mutations
    document.getElementById('metricCycles').innerText = savedDailyCycles.toLocaleString();
    document.getElementById('metricTime').innerText = `${executionTimeSavedSeconds.toFixed(4)}s`;
    document.getElementById('metricEnergy').innerText = savedDailyCycles > 0 ? `${energySavedMicroWh.toFixed(3)} uWh` : `0.000 uWh`;
}

/**
 * Copies the auto-generated code template block cleanly to system paste buffers.
 */
function copyGeneratedCode() {
    if (!generatedTemplate) return;
    navigator.clipboard.writeText(generatedTemplate).then(() => {
        const btn = document.querySelector('#exporterContainer button');
        const defaultText = btn.innerHTML;
        btn.innerHTML = "✨ Copied Clean Template to Clipboard!";
        setTimeout(() => {
            btn.innerHTML = defaultText;
        }, 2000);
    }).catch(err => {
        console.error("System configuration clipboard hook constraint: ", err);
    });
}
