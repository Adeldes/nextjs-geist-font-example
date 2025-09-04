module.exports = {

"[project]/.next-internal/server/app/api/auth/login/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/crypto [external] (crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[externals]/buffer [external] (buffer, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}}),
"[externals]/stream [external] (stream, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}}),
"[externals]/util [external] (util, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}}),
"[externals]/better-sqlite3 [external] (better-sqlite3, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("better-sqlite3", () => require("better-sqlite3"));

module.exports = mod;
}}),
"[externals]/path [external] (path, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}}),
"[project]/src/lib/database.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "backupDatabase": (()=>backupDatabase),
    "checkDatabaseHealth": (()=>checkDatabaseHealth),
    "closeDatabase": (()=>closeDatabase),
    "generateContractNumber": (()=>generateContractNumber),
    "generateSigningLink": (()=>generateSigningLink),
    "getDatabase": (()=>getDatabase),
    "initDatabase": (()=>initDatabase),
    "logAudit": (()=>logAudit)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/better-sqlite3 [external] (better-sqlite3, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
;
// Database instance
let db = null;
function initDatabase() {
    if (db) return db;
    const dbPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data', 'contracts.db');
    try {
        db = new __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$29$__["default"](dbPath);
        db.pragma('journal_mode = WAL');
        db.pragma('foreign_keys = ON');
        // Create tables
        createTables();
        // Insert initial data
        insertInitialData();
        console.log('Database initialized successfully');
        return db;
    } catch (error) {
        console.error('Failed to initialize database:', error);
        throw error;
    }
}
// Create all required tables
function createTables() {
    if (!db) throw new Error('Database not initialized');
    // Branches table
    db.exec(`
    CREATE TABLE IF NOT EXISTS branches (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      code TEXT UNIQUE NOT NULL,
      address TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
    // Users table
    db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('employee', 'manager', 'admin')),
      branch_id INTEGER,
      signature_data TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (branch_id) REFERENCES branches(id)
    )
  `);
    // Contracts table
    db.exec(`
    CREATE TABLE IF NOT EXISTS contracts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      contract_number TEXT UNIQUE NOT NULL,
      client_name TEXT NOT NULL,
      client_phone TEXT,
      client_email TEXT,
      contract_type TEXT NOT NULL CHECK (contract_type IN ('agreement', 'concrete_supervision', 'comprehensive_supervision')),
      branch_id INTEGER NOT NULL,
      value DECIMAL(10,2) NOT NULL,
      duration_months INTEGER NOT NULL,
      status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'pending_client_signature', 'client_signed', 'employee_approved', 'fully_executed', 'archived')),
      signing_link TEXT UNIQUE,
      link_expires_at DATETIME,
      locked_at DATETIME,
      client_signed_at DATETIME,
      employee_signed_at DATETIME,
      management_approved_at DATETIME,
      created_by INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      services_description TEXT,
      terms_and_conditions TEXT,
      FOREIGN KEY (branch_id) REFERENCES branches(id),
      FOREIGN KEY (created_by) REFERENCES users(id)
    )
  `);
    // Payments table
    db.exec(`
    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      contract_id INTEGER NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      due_date DATE NOT NULL,
      paid_date DATE,
      status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue')),
      payment_method TEXT,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (contract_id) REFERENCES contracts(id) ON DELETE CASCADE
    )
  `);
    // Signatures table
    db.exec(`
    CREATE TABLE IF NOT EXISTS signatures (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      contract_id INTEGER NOT NULL,
      user_id INTEGER,
      signature_type TEXT NOT NULL CHECK (signature_type IN ('client', 'employee', 'management_seal')),
      signature_data TEXT NOT NULL,
      signed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      ip_address TEXT,
      FOREIGN KEY (contract_id) REFERENCES contracts(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
    // Audit logs table
    db.exec(`
    CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      action_type TEXT NOT NULL CHECK (action_type IN ('create', 'update', 'delete', 'login', 'logout', 'sign', 'approve', 'export', 'search')),
      table_name TEXT NOT NULL,
      record_id INTEGER,
      old_values TEXT,
      new_values TEXT,
      branch_id INTEGER,
      ip_address TEXT,
      user_agent TEXT,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (branch_id) REFERENCES branches(id)
    )
  `);
    // Notifications table
    db.exec(`
    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      type TEXT NOT NULL CHECK (type IN ('payment_due', 'contract_expiring', 'signature_required', 'contract_signed', 'payment_overdue')),
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      contract_id INTEGER,
      payment_id INTEGER,
      read BOOLEAN DEFAULT FALSE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (contract_id) REFERENCES contracts(id),
      FOREIGN KEY (payment_id) REFERENCES payments(id)
    )
  `);
    // Create indexes for better performance
    db.exec(`
    CREATE INDEX IF NOT EXISTS idx_contracts_branch_id ON contracts(branch_id);
    CREATE INDEX IF NOT EXISTS idx_contracts_status ON contracts(status);
    CREATE INDEX IF NOT EXISTS idx_contracts_created_by ON contracts(created_by);
    CREATE INDEX IF NOT EXISTS idx_contracts_contract_number ON contracts(contract_number);
    CREATE INDEX IF NOT EXISTS idx_payments_contract_id ON payments(contract_id);
    CREATE INDEX IF NOT EXISTS idx_payments_due_date ON payments(due_date);
    CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
    CREATE INDEX IF NOT EXISTS idx_signatures_contract_id ON signatures(contract_id);
    CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
    CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
    CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
    CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
  `);
    // Create trigger to update updated_at timestamp
    db.exec(`
    CREATE TRIGGER IF NOT EXISTS update_contracts_timestamp 
    AFTER UPDATE ON contracts
    BEGIN
      UPDATE contracts SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;
  `);
    db.exec(`
    CREATE TRIGGER IF NOT EXISTS update_payments_timestamp 
    AFTER UPDATE ON payments
    BEGIN
      UPDATE payments SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;
  `);
}
// Insert initial data (branches and admin user)
async function insertInitialData() {
    if (!db) throw new Error('Database not initialized');
    // Check if branches already exist
    const branchCount = db.prepare('SELECT COUNT(*) as count FROM branches').get();
    if (branchCount.count === 0) {
        // Insert branches
        const insertBranch = db.prepare('INSERT INTO branches (name, code, address) VALUES (?, ?, ?)');
        const branches = [
            {
                name: 'جدة',
                code: 'JED',
                address: 'جدة، المملكة العربية السعودية'
            },
            {
                name: 'مكة',
                code: 'MEC',
                address: 'مكة المكرمة، المملكة العربية السعودية'
            },
            {
                name: 'الأحساء',
                code: 'AHS',
                address: 'الأحساء، المملكة العربية السعودية'
            },
            {
                name: 'حلي',
                code: 'HAL',
                address: 'حلي، المملكة العربية السعودية'
            }
        ];
        for (const branch of branches){
            insertBranch.run(branch.name, branch.code, branch.address);
        }
        console.log('Initial branches inserted');
    }
    // Check if admin user exists
    const userCount = db.prepare('SELECT COUNT(*) as count FROM users WHERE role = ?').get('admin');
    if (userCount.count === 0) {
        // Create default admin user
        const adminPassword = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hash"])('admin123', 12);
        const insertUser = db.prepare('INSERT INTO users (email, password_hash, role, branch_id) VALUES (?, ?, ?, ?)');
        // Get first branch ID for admin
        const firstBranch = db.prepare('SELECT id FROM branches ORDER BY id LIMIT 1').get();
        insertUser.run('admin@injazak.com', adminPassword, 'admin', firstBranch.id);
        console.log('Default admin user created: admin@injazak.com / admin123');
    }
}
function getDatabase() {
    if (!db) {
        return initDatabase();
    }
    return db;
}
function closeDatabase() {
    if (db) {
        db.close();
        db = null;
    }
}
function generateContractNumber(branchCode) {
    const year = new Date().getFullYear();
    const timestamp = Date.now().toString().slice(-6);
    return `${branchCode}-${year}-${timestamp}`;
}
function generateSigningLink() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for(let i = 0; i < 32; i++){
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
function logAudit(params) {
    if (!db) return;
    const insertAudit = db.prepare(`
    INSERT INTO audit_logs (
      user_id, action_type, table_name, record_id, 
      old_values, new_values, branch_id, ip_address, 
      user_agent, description
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
    insertAudit.run(params.userId || null, params.actionType, params.tableName, params.recordId || null, params.oldValues ? JSON.stringify(params.oldValues) : null, params.newValues ? JSON.stringify(params.newValues) : null, params.branchId || null, params.ipAddress || null, params.userAgent || null, params.description || null);
}
function backupDatabase(backupPath) {
    if (!db) throw new Error('Database not initialized');
    const backup = new __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$29$__["default"](backupPath);
    db.backup(backup);
    backup.close();
    console.log(`Database backed up to: ${backupPath}`);
}
function checkDatabaseHealth() {
    try {
        if (!db) return false;
        // Simple query to check if database is responsive
        const result = db.prepare('SELECT 1 as test').get();
        return result !== undefined;
    } catch (error) {
        console.error('Database health check failed:', error);
        return false;
    }
}
// Initialize database on module load
if ("TURBOPACK compile-time truthy", 1) {
    // Only initialize on server side
    try {
        initDatabase();
    } catch (error) {
        console.error('Failed to initialize database on startup:', error);
    }
}
}}),
"[project]/src/app/api/auth/login/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/database.ts [app-route] (ecmascript)");
;
;
;
;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
async function POST(request) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'البريد الإلكتروني وكلمة المرور مطلوبان'
            }, {
                status: 400
            });
        }
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDatabase"])();
        // Get user with branch information
        const user = db.prepare(`
      SELECT u.*, b.name as branch_name, b.code as branch_code 
      FROM users u 
      LEFT JOIN branches b ON u.branch_id = b.id 
      WHERE u.email = ?
    `).get(email);
        if (!user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
            }, {
                status: 401
            });
        }
        // Verify password
        const isValidPassword = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["compare"])(password, user.password_hash);
        if (!isValidPassword) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
            }, {
                status: 401
            });
        }
        // Create JWT token
        const token = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign({
            userId: user.id,
            email: user.email,
            role: user.role,
            branchId: user.branch_id
        }, JWT_SECRET, {
            expiresIn: '24h'
        });
        // Prepare user data (exclude password_hash)
        const userData = {
            id: user.id,
            email: user.email,
            password_hash: '',
            role: user.role,
            branch_id: user.branch_id,
            branch: user.branch_name ? {
                id: user.branch_id,
                name: user.branch_name,
                code: user.branch_code,
                created_at: ''
            } : undefined,
            signature_data: user.signature_data,
            created_at: user.created_at
        };
        // Log the login action
        const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
        const userAgent = request.headers.get('user-agent') || 'unknown';
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logAudit"])({
            userId: user.id,
            actionType: 'login',
            tableName: 'users',
            recordId: user.id,
            branchId: user.branch_id,
            ipAddress: clientIP,
            userAgent: userAgent,
            description: `User login: ${user.email}`
        });
        const response = {
            success: true,
            data: {
                user: userData,
                token
            },
            message: 'تم تسجيل الدخول بنجاح'
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(response);
    } catch (error) {
        console.error('Login error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'حدث خطأ في الخادم'
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__1622844f._.js.map