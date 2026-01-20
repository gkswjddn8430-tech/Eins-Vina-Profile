
import os

css_path = r"C:\Users\USER\.gemini\antigravity\scratch\eins_vina\style.css"
new_snake_css = """
/* Production Flow Chart - Snake Layout */
.production-flow {
    padding: 6rem 5%;
    background-color: var(--white);
    overflow: hidden;
}

.snake-container {
    max-width: 1200px;
    margin: 4rem auto;
    position: relative;
    padding: 2rem 0;
}

/* The winding road SVG background */
.snake-bg {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 150px;
    transform: translateY(-50%);
    z-index: 1;
    pointer-events: none;
}

.snake-path {
    fill: none;
    stroke: #444; /* Dark road color */
    stroke-width: 60;
    stroke-linecap: round;
}

.snake-dashed {
    fill: none;
    stroke: #fff;
    stroke-width: 3;
    stroke-dasharray: 10, 10;
    stroke-linecap: round;
    opacity: 0.6;
}

.snake-items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 2;
    height: 300px; /* Allocate space for top/bottom text */
}

.snake-item {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.snake-node {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: var(--white);
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 4px solid var(--white);
    position: relative;
    z-index: 5;
    transition: transform 0.3s ease;
}

/* Colors for nodes */
.snake-item:nth-child(1) .snake-node { background-color: #e74c3c; color: white; }
.snake-item:nth-child(2) .snake-node { background-color: #3498db; color: white; }
.snake-item:nth-child(3) .snake-node { background-color: #f1c40f; color: #333; }
.snake-item:nth-child(4) .snake-node { background-color: #2ecc71; color: white; }
.snake-item:nth-child(5) .snake-node { background-color: #9b59b6; color: white; }
.snake-item:nth-child(6) .snake-node { background-color: #34495e; color: white; }

.snake-node:hover {
    transform: scale(1.1);
    box-shadow: 0 15px 35px rgba(0,0,0,0.25);
}

.snake-node i {
    font-size: 1.8rem;
    margin-bottom: 5px;
}
.snake-node span {
    font-size: 0.85rem;
    font-weight: 700;
    line-height: 1.2;
}

/* Text Detail Blocks */
.snake-details {
    position: absolute;
    width: 180px;
    background: var(--white);
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    border: 1px solid #eee;
    font-size: 0.85rem;
    color: var(--text-dark);
    text-align: left;
    opacity: 0;
    transition: all 0.3s ease;
    pointer-events: none; 
}

/* Alternating Text positions */
.snake-item:nth-child(odd) .snake-details {
    top: 130px; 
    transform: translateY(-10px);
}
.snake-item:nth-child(even) .snake-details {
    bottom: 130px; 
    transform: translateY(10px);
}

.snake-item:hover .snake-details {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
    z-index: 10;
}

.snake-details h4 {
    color: var(--primary-blue);
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
    border-bottom: 2px solid var(--secondary-blue);
    padding-bottom: 0.3rem;
}

.snake-details ul {
    list-style: none;
    padding: 0;
}
.snake-details li {
    margin-bottom: 0.3rem;
    padding-left: 0.8rem;
    position: relative;
    font-size: 0.8rem;
    color: #666;
}
.snake-details li::before {
    content: '-';
    position: absolute;
    left: 0;
    color: var(--secondary-blue);
}

/* Connectors */
.snake-details::after {
    content: '';
    position: absolute;
    width: 0; 
    height: 0; 
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
}

.snake-item:nth-child(odd) .snake-details::after {
    border-bottom: 8px solid var(--white);
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
}

.snake-item:nth-child(even) .snake-details::after {
    border-top: 8px solid var(--white);
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
}

@media (max-width: 900px) {
    .snake-bg {
        display: none; 
    }
    .snake-items {
        flex-direction: column;
        height: auto;
        gap: 2rem;
    }
    .snake-item {
        flex-direction: row;
        width: 100%;
        justify-content: flex-start;
        padding: 1rem;
        background: var(--white);
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }
    .snake-node {
        width: 70px;
        height: 70px;
        margin-right: 1.5rem;
        flex-shrink: 0;
        border-width: 2px;
    }
    .snake-node i {
        font-size: 1.4rem;
    }
    .snake-node span {
        font-size: 0.7rem;
    }
    .snake-details {
        position: static;
        width: auto;
        opacity: 1;
        transform: none;
        box-shadow: none;
        border: none;
        padding: 0;
        pointer-events: auto;
        flex-grow: 1;
        background: transparent;
    }
    .snake-details::after {
        display: none;
    }
    
    .snake-item:nth-child(odd) .snake-details,
    .snake-item:nth-child(even) .snake-details {
        transform: none;
    }
}
"""

with open(css_path, 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

# Clean up any potential weirdness in the lines (like null bytes if utf-16 mixed in)
clean_lines = []
for line in lines:
    clean_lines.append(line.replace('\x00', ''))

# We want lines up to index around 580. 
# Looking at the file content, the "Circular Flow" started appending after ".about-container { grid-template-columns: 1fr; }" or similar.
# Step 379 showed line 580 was empty after that block.
# Let's verify the content to find the cut-off point.

cut_off_index = 0
for i, line in enumerate(clean_lines):
    if ".about-img {" in line and "order: -1;" in line:
        # This is around line 585 in the backup/corrupted file
        cut_off_index = i + 2 # Include the closing brace
        break
    if ".competency-details strong {" in line:
        # Better anchor: last "clean" block before corruption in style.css view earlier
        # line 772 in Step 373 view before corruption
        pass

# Actually, the view in step 373 showed corruption starting line 777.
# But Step 379 shows clean up to 580.
# The corruption from `cat` probably happened at the *very end* of the file at that time.
# But I tried to replace content and messed it up more.
# Let's safe bet: Find ".competency-details strong" and cut after its closing brace.

found_anchor = False
for i, line in enumerate(clean_lines):
    if ".competency-details strong" in line:
        # The next few lines should be the closing brace
        found_anchor = True
    if found_anchor and "}" in line:
        cut_off_index = i + 1
        break

if cut_off_index == 0:
    # Fallback: Just take first 580 lines if anchor not found, assuming manual check was correct
    cut_off_index = 580

final_content = "".join(clean_lines[:cut_off_index]) + "\n" + new_snake_css

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(final_content)

print(f"Fixed style.css. file length: {len(final_content)} bytes.")
