// Configurazione del grafico delle performance
const initializeChart = () => {
  const ctx = document.getElementById("performanceChart").getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, "rgba(108, 92, 231, 0.2)");
  gradient.addColorStop(1, "rgba(108, 92, 231, 0)");

  const labels = Array.from({ length: 24 }, (_, i) => {
    const hour = new Date();
    hour.setHours(hour.getHours() - (23 - i));
    return `${hour.getHours()}:00`;
  });

  const data = Array.from({ length: 24 }, () =>
    Math.floor(80 + Math.random() * 150)
  );

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Tempo di Risposta (ms)",
          data: data,
          borderColor: "#6C5CE7",
          backgroundColor: gradient,
          tension: 0.4,
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: "#6C5CE7",
          pointHoverBorderColor: "#fff",
          pointHoverBorderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          mode: "index",
          intersect: false,
          backgroundColor: "#1E293B",
          titleColor: "#E2E8F0",
          bodyColor: "#94A3B8",
          borderColor: "rgba(255, 255, 255, 0.1)",
          borderWidth: 1,
          padding: 10,
          displayColors: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(255, 255, 255, 0.05)",
          },
          ticks: {
            color: "#94A3B8",
          },
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: "#94A3B8",
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
    },
  });
};

// Dati dei servizi
const services = [
  {
    name: "API Gateway",
    status: "online",
    uptime: "99.99%",
    responseTime: "89ms",
    requests: "1.2M/hour",
  },
  {
    name: "Database Cluster",
    status: "degraded",
    uptime: "99.95%",
    responseTime: "156ms",
    requests: "850K/hour",
  },
  {
    name: "Auth Service",
    status: "offline",
    uptime: "98.45%",
    responseTime: "---",
    requests: "0/hour",
  },
  {
    name: "Storage Service",
    status: "online",
    uptime: "99.98%",
    responseTime: "210ms",
    requests: "500K/hour",
  },
  {
    name: "Message Queue",
    status: "online",
    uptime: "99.99%",
    responseTime: "45ms",
    requests: "2.1M/hour",
  },
  {
    name: "CDN",
    status: "online",
    uptime: "100%",
    responseTime: "25ms",
    requests: "3.5M/hour",
  },
];

// Renderizza i servizi
const renderServices = () => {
  const servicesGrid = document.querySelector(".services-grid");
  servicesGrid.innerHTML = services
    .map(
      (service) => `
        <div class="service-card">
            <div class="service-header">
                <div class="service-name">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                    </svg>
                    ${service.name}
                </div>
                <span class="status-badge ${service.status}">${
        service.status.charAt(0).toUpperCase() + service.status.slice(1)
      }</span>
            </div>
            <div class="service-metrics">
                <div class="metric">
                    <span>Uptime</span>
                    <span class="metric-value">${service.uptime}</span>
                </div>
                <div class="metric">
                    <span>Response Time</span>
                    <span class="metric-value">${service.responseTime}</span>
                </div>
                <div class="metric">
                    <span>Requests</span>
                    <span class="metric-value">${service.requests}</span>
                </div>
            </div>
        </div>
    `
    )
    .join("");
};

// Funzione per aggiornare i tempi di risposta casuali
const updateResponseTimes = () => {
  services.forEach((service) => {
    if (service.status !== "offline") {
      service.responseTime = `${Math.floor(20 + Math.random() * 200)}ms`;
      const requestBase = Math.floor(Math.random() * 500);
      service.requests = `${requestBase}K/hour`;
    }
  });
  renderServices();
};

// Effetto hover sulle stat cards
const initializeStatCards = () => {
  const statCards = document.querySelectorAll(".stat-card");
  statCards.forEach((card) => {
    card.addEventListener("mouseover", () => {
      card.style.transform = "translateY(-5px)";
    });
    card.addEventListener("mouseout", () => {
      card.style.transform = "translateY(0)";
    });
  });
};

// Inizializzazione
document.addEventListener("DOMContentLoaded", () => {
  initializeChart();
  renderServices();
  initializeStatCards();

  // Aggiorna i dati ogni 5 secondi
  setInterval(updateResponseTimes, 5000);
});

// Gestione tema dark/light (preparato per future implementazioni)
let isDarkMode = true;
const toggleTheme = () => {
  isDarkMode = !isDarkMode;
  if (isDarkMode) {
    document.documentElement.style.setProperty("--background", "#0F172A");
    document.documentElement.style.setProperty("--card-bg", "#1E293B");
    document.documentElement.style.setProperty("--text", "#E2E8F0");
    document.documentElement.style.setProperty("--text-secondary", "#94A3B8");
  } else {
    document.documentElement.style.setProperty("--background", "#F1F5F9");
    document.documentElement.style.setProperty("--card-bg", "#FFFFFF");
    document.documentElement.style.setProperty("--text", "#1E293B");
    document.documentElement.style.setProperty("--text-secondary", "#64748B");
  }
};

// Funzione per formattare i numeri grandi
const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
};

// Funzione per generare un timestamp formattato
const getFormattedTimestamp = () => {
  const now = new Date();
  return now.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
