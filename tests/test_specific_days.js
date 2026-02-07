const { runGreedy } = require('../scheduler');

// Mock data
const siteId = 1;
const startObj = new Date('2023-01-01'); // Sunday
const days = 14; // 2 weeks

// Shifts:
// 1. Day Shift (Every Day)
// 2. Friday Only Shift (Day 5)
const shifts = [
    { id: 1, name: 'Day', start_time: '08:00', end_time: '16:00', required_staff: 1, days_of_week: '0,1,2,3,4,5,6' },
    { id: 2, name: 'FriOnly', start_time: '12:00', end_time: '20:00', required_staff: 1, days_of_week: '5' }
];

const users = [
    { id: 1, username: 'User1', category_priority: 10 },
    { id: 2, username: 'User2', category_priority: 10 }
];

const userSettings = {
    1: { max_consecutive: 5, min_days_off: 2, night_pref: 1, target_shifts: 20, target_variance: 2, preferred_block_size: 3, shift_ranking: [], availability: {} },
    2: { max_consecutive: 5, min_days_off: 2, night_pref: 1, target_shifts: 20, target_variance: 2, preferred_block_size: 3, shift_ranking: [], availability: {} }
};

const requests = [];
const prevAssignments = [];
const lockedAssignments = [];

console.log("Running Greedy Scheduler...");
const result = runGreedy({
    siteId, startObj, days,
    shifts, users, userSettings, requests,
    prevAssignments, lockedAssignments,
    forceMode: false
});

console.log("Assignments generated:", result.assignments.length);

// Verify FriOnly shift assignments
const friOnlyAssigns = result.assignments.filter(a => a.shiftId === 2);

console.log(`FriOnly Assignments: ${friOnlyAssigns.length}`);

let fail = false;
friOnlyAssigns.forEach(a => {
    // new Date('YYYY-MM-DD') parses as UTC midnight
    const day = new Date(a.date).getUTCDay(); // 0-6
    console.log(`Assigned FriOnly on ${a.date} (Day ${day})`);
    if (day !== 5) {
        console.error(`ERROR: FriOnly assigned on Day ${day}`);
        fail = true;
    }
});

// Should have assignments on Jan 6 (Fri) and Jan 13 (Fri)
if (friOnlyAssigns.length !== 2) {
    console.error(`ERROR: Expected 2 FriOnly assignments, got ${friOnlyAssigns.length}`);
    fail = true;
}

if (!fail) console.log("SUCCESS: Specific Day Logic Verified");
else process.exit(1);
