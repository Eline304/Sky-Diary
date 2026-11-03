
<script setup lang="ts">
defineProps<{
    outbound: {
        flightNumber: string
        from: string
        to: string
        date: string
        aircraft: string
    }
    returnFlight: {
        flightNumber: string
        from: string
        to: string
        date: string
        aircraft: string
    }
}>()
</script>

<template>
    <div class="flight-info">
        <div class="flight-row">
            <div class="flight-icon">
                <svg viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M321,1164h120l269.28-480.06H1020c0,0,180,0,180-83.94c0-84-180-84-180-84H710.28L441,36H321l149.28,480H255.06L120,395.94H0l96.06,204L0,804h120l135.06-120.06h215.22L321,1164z"
                    />
                </svg>
            </div>

            <div class="flight-details">
                <p class="flight-route">
                    {{ outbound.from }} – {{ outbound.to }}
                </p>
                <p class="flight-meta">
                    {{ outbound.date }} <span>·</span>
                    {{ outbound.flightNumber }} <span>·</span>
                    {{ outbound.aircraft }}
                </p>
            </div>

        </div>

        <div class="flight-divider"></div>

        <div class="flight-row">
            <div class="flight-icon return-icon">
                <svg viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(1200, 0) scale(-1, 1)">
                        <path
                            d="M321,1164h120l269.28-480.06H1020c0,0,180,0,180-83.94c0-84-180-84-180-84H710.28L441,36H321l149.28,480H255.06L120,395.94H0l96.06,204L0,804h120l135.06-120.06h215.22L321,1164z"
                        />
                    </g>
                </svg>
            </div>

            <div class="flight-details">
                <p class="flight-route">
                    {{ returnFlight.from }} – {{ returnFlight.to }}
                </p>
                <p class="flight-meta">
                    {{ returnFlight.date }} <span>·</span>
                    {{ returnFlight.flightNumber }} <span>·</span>
                    {{ returnFlight.aircraft }}
                </p>
            </div>

        </div>
    </div>
</template>

<style scoped>
.flight-info {
    display: flex;
    gap: 0;
    padding: 8px 18px;
    background: #fff;
    border: 1px solid #eae8e3;
    border-radius: 8px;
}

.flight-row {
    display: flex;
    align-items: center;
    gap: 13px;
    padding: 12px;
    min-width: 0;
}

.flight-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 34px;
    height: 34px;
    border-radius: 6px;
    background: #f5f4f0;
    color: #686b63;
}

.flight-icon svg {
    width: 15px;
    height: 15px;
    fill: currentColor;
}

.flight-details {
    flex: 1;
    min-width: 0;
}

.flight-info p {
    margin: 0;
}

.flight-route {
    color: #30332f;
    font-size: 0.9rem;
    font-weight: 500;
    line-height: 1.5;
}

.flight-meta {
    margin-top: 3px !important;
    color: #85867f;
    font-size: 0.76rem;
    line-height: 1.5;
    overflow-wrap: anywhere;
}

.flight-meta span {
    padding: 0 3px;
    color: #c0bdb5;
}

.flight-divider {
    height: 100%;
    background: #eeece7;
}

@media (max-width: 480px) {
    .flight-info {
        padding: 6px 12px;
    }

    .flight-row {
        gap: 10px;
        padding: 11px 0;
    }

    .flight-icon {
        width: 30px;
        height: 30px;
    }

    .flight-route {
        font-size: 0.85rem;
    }

    .flight-meta {
        font-size: 0.7rem;
    }

}


</style>
