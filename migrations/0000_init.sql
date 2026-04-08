-- Initial Migration: Create location_logs table
CREATE TABLE IF NOT EXISTS location_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    track_id TEXT NOT NULL,
    ip TEXT,
    country TEXT,
    region TEXT,
    city TEXT,
    latitude TEXT,
    longitude TEXT,
    user_agent TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster querying by track_id
CREATE INDEX IF NOT EXISTS idx_track_id ON location_logs(track_id);
-- Create index for cleanup job
CREATE INDEX IF NOT EXISTS idx_created_at ON location_logs(created_at);
