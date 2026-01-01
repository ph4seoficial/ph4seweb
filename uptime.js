/**
 * ph4se Bot Uptime Counter
 * 
 * Este script calcula el uptime real del bot basándose en una fecha de inicio.
 * El uptime se muestra igual para todos los usuarios porque se calcula
 * desde una fecha fija cuando el bot se encendió.
 * 
 * CONFIGURACIÓN:
 * Cambia BOT_START_DATE a la fecha/hora exacta cuando el bot se encendió.
 * El formato es: new Date('YYYY-MM-DDTHH:MM:SS')
 */

// ============================================
// CONFIGURACIÓN - CAMBIAR ESTA FECHA
// ============================================
// Fecha y hora cuando el bot se encendió
// Formato: Año-Mes-DíaTHora:Minuto:Segundo
// Ejemplo: Si el bot lleva 63 horas encendido desde ahora,
// calcula 63 horas hacia atrás y pon esa fecha aquí.

const BOT_START_DATE = new Date('2025-12-29T20:00:00');

// ============================================
// NO MODIFICAR DEBAJO DE ESTA LÍNEA
// ============================================

class UptimeCounter {
    constructor(startDate) {
        this.startDate = startDate;
        this.elements = document.querySelectorAll('.uptime-counter, #uptime-display');
        this.init();
    }

    init() {
        if (this.elements.length === 0) return;
        
        // Actualizar inmediatamente
        this.update();
        
        // Actualizar cada segundo
        setInterval(() => this.update(), 1000);
    }

    getUptime() {
        const now = new Date();
        const diff = now - this.startDate;
        
        // Si la fecha de inicio es en el futuro, mostrar 0
        if (diff < 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0, totalHours: 0 };
        }

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        return {
            days: days,
            hours: hours % 24,
            minutes: minutes % 60,
            seconds: seconds % 60,
            totalHours: hours
        };
    }

    formatUptime(uptime) {
        // Si hay días, mostrar días y horas
        if (uptime.days > 0) {
            return `${uptime.days}d ${uptime.hours}h`;
        }
        // Si no hay días, mostrar horas y minutos
        return `${uptime.totalHours}h ${String(uptime.minutes).padStart(2, '0')}m`;
    }

    formatUptimeDetailed(uptime) {
        const parts = [];
        
        if (uptime.days > 0) {
            parts.push(`${uptime.days} día${uptime.days !== 1 ? 's' : ''}`);
        }
        if (uptime.hours > 0 || uptime.days > 0) {
            parts.push(`${uptime.hours} hora${uptime.hours !== 1 ? 's' : ''}`);
        }
        parts.push(`${uptime.minutes} minuto${uptime.minutes !== 1 ? 's' : ''}`);
        
        return parts.join(', ');
    }

    update() {
        const uptime = this.getUptime();
        const formatted = this.formatUptime(uptime);
        
        this.elements.forEach(el => {
            el.textContent = formatted;
            // Añadir tooltip con tiempo detallado
            el.title = this.formatUptimeDetailed(uptime);
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new UptimeCounter(BOT_START_DATE);
});

// También inicializar si el script se carga después del DOM
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    new UptimeCounter(BOT_START_DATE);
}
