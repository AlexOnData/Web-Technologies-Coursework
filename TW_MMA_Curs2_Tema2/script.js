// Curs 2 - Hausaufgabe 2 - Triangle analyzer
// Reads three positive numbers a, b, c and:
//   1. checks if they can form a triangle (a+b>c, a+c>b, b+c>a)
//   2. checks if it's a right triangle (Pythagoras) and which sides form the right angle
//   3. computes the area using Heron's formula

const form = document.getElementById("triangle-form");
const promptBtn = document.getElementById("prompt-btn");
const resultEl = document.getElementById("result");

function isPositiveNumber(value) {
    return typeof value === "number" && isFinite(value) && value > 0;
}

function analyzeTriangle(a, b, c) {
    if (![a, b, c].every(isPositiveNumber)) {
        return {
            ok: false,
            message: "All three values must be positive numbers."
        };
    }

    const isTriangle = a + b > c && a + c > b && b + c > a;
    if (!isTriangle) {
        return {
            ok: false,
            message: `These sides cannot form a triangle. The triangle inequality must hold: a+b > c, a+c > b, b+c > a.`
        };
    }

    // Right-triangle check (allow tiny floating-point tolerance)
    const eps = 1e-9;
    let rightAngle = null;
    if (Math.abs(a * a + b * b - c * c) < eps) {
        rightAngle = "between sides a and b (c is the hypotenuse)";
    } else if (Math.abs(a * a + c * c - b * b) < eps) {
        rightAngle = "between sides a and c (b is the hypotenuse)";
    } else if (Math.abs(b * b + c * c - a * a) < eps) {
        rightAngle = "between sides b and c (a is the hypotenuse)";
    }

    // Heron's formula
    const p = (a + b + c) / 2;
    const area = Math.sqrt(p * (p - a) * (p - b) * (p - c));

    return {
        ok: true,
        rightAngle,
        semiPerimeter: p,
        area
    };
}

function renderResult(a, b, c, analysis) {
    if (!analysis.ok) {
        resultEl.classList.remove("success");
        resultEl.classList.add("error");
        resultEl.innerHTML = `
            <h2>❌ Invalid input</h2>
            <p>${analysis.message}</p>
            <p>You entered: a=${a}, b=${b}, c=${c}</p>
        `;
        return;
    }

    resultEl.classList.remove("error");
    resultEl.classList.add("success");

    const rightAngleHtml = analysis.rightAngle
        ? `<li>📐 <strong>Right triangle:</strong> yes — right angle is ${analysis.rightAngle}.</li>`
        : `<li>📐 <strong>Right triangle:</strong> no — none of the Pythagorean equalities hold.</li>`;

    resultEl.innerHTML = `
        <h2>✅ It's a triangle!</h2>
        <ul>
            <li>📏 <strong>Sides:</strong> a = ${a}, b = ${b}, c = ${c}</li>
            ${rightAngleHtml}
            <li>📐 <strong>Semi-perimeter:</strong> p = (a + b + c) / 2 = <span class="formula">${analysis.semiPerimeter.toFixed(4)}</span></li>
            <li>🟦 <strong>Area (Heron):</strong> A = √(p·(p-a)·(p-b)·(p-c)) = <span class="formula">${analysis.area.toFixed(4)}</span></li>
        </ul>
    `;
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const a = parseFloat(document.getElementById("a").value);
    const b = parseFloat(document.getElementById("b").value);
    const c = parseFloat(document.getElementById("c").value);
    renderResult(a, b, c, analyzeTriangle(a, b, c));
});

form.addEventListener("reset", () => {
    resultEl.classList.remove("success", "error");
    resultEl.innerHTML = `<p class="placeholder">Enter three sides and press <em>Analyze</em>.</p>`;
});

// Bonus: same analyzer triggered from prompt() dialogs (matches the
// course slide example which used prompt() + parseFloat()).
promptBtn.addEventListener("click", () => {
    const a = parseFloat(prompt("Enter side a:"));
    const b = parseFloat(prompt("Enter side b:"));
    const c = parseFloat(prompt("Enter side c:"));

    document.getElementById("a").value = isFinite(a) ? a : "";
    document.getElementById("b").value = isFinite(b) ? b : "";
    document.getElementById("c").value = isFinite(c) ? c : "";

    renderResult(a, b, c, analyzeTriangle(a, b, c));
});
