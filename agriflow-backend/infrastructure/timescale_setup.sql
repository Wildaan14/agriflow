-- TimescaleDB setup for price history
CREATE TABLE price_history (
    time TIMESTAMPTZ NOT NULL,
    commodity_type VARCHAR(50) NOT NULL,
    kabupaten VARCHAR(100) NOT NULL,
    avg_price_per_kg DECIMAL(10,2) NOT NULL,
    min_price DECIMAL(10,2),
    max_price DECIMAL(10,2),
    volume_kg DECIMAL(12,2),
    source VARCHAR(20) DEFAULT 'platform'
);

SELECT create_hypertable('price_history', 'time', chunk_time_interval => INTERVAL '7 days');

CREATE INDEX ix_price_history_commodity_time ON price_history (commodity_type, time DESC);
