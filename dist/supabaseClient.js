"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_js_1 = require("@supabase/supabase-js");
const supabaseUrl = 'https://zxhtvdtxemnroxwuqrfi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4aHR2ZHR4ZW1ucm94d3VxcmZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE3MjM3MzMsImV4cCI6MjAxNzI5OTczM30.roN6Ee_WdfGdo1yuy0Qcxzmz-nEL8htbH0mi1AkcRjE';
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
exports.default = supabase;
