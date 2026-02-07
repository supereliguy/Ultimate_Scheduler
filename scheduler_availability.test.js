const { checkConstraints } = require('./scheduler');

describe('checkConstraints - Availability Rules', () => {
    const mockUser = { id: 1, username: 'test_user' };
    const mockShift = { id: 1, name: 'Day', start_time: '08:00', end_time: '16:00' };
    const mockDateObj = new Date('2023-10-02T00:00:00'); // Monday (Day 1)
    const mockDateStr = '2023-10-02';

    // Default valid settings
    const baseSettings = {
        max_consecutive: 5,
        availability: { blocked_days: [], blocked_shifts: [] }
    };

    const mockState = { consecutive: 0, lastShift: null, lastDate: null };

    test('should allow if no rules violated', () => {
        const result = checkConstraints(mockUser, mockShift, mockDateStr, mockDateObj, mockState, baseSettings, null);
        expect(result.valid).toBe(true);
    });

    test('should block if day is in blocked_days', () => {
        // Monday is day 1
        const settings = {
            ...baseSettings,
            availability: { blocked_days: [1], blocked_shifts: [] }
        };
        const result = checkConstraints(mockUser, mockShift, mockDateStr, mockDateObj, mockState, settings, null);
        expect(result.valid).toBe(false);
        expect(result.reason).toContain('Availability');
    });

    test('should allow if day is NOT in blocked_days', () => {
        // Monday is day 1. Block Sunday (0).
        const settings = {
            ...baseSettings,
            availability: { blocked_days: [0], blocked_shifts: [] }
        };
        const result = checkConstraints(mockUser, mockShift, mockDateStr, mockDateObj, mockState, settings, null);
        expect(result.valid).toBe(true);
    });

    test('should block if shift is in blocked_shifts', () => {
        const settings = {
            ...baseSettings,
            availability: { blocked_days: [], blocked_shifts: [1] }
        };
        const result = checkConstraints(mockUser, mockShift, mockDateStr, mockDateObj, mockState, settings, null);
        expect(result.valid).toBe(false);
        expect(result.reason).toContain('Availability');
    });

    test('should allow if shift is NOT in blocked_shifts', () => {
        const settings = {
            ...baseSettings,
            availability: { blocked_days: [], blocked_shifts: [99] }
        };
        const result = checkConstraints(mockUser, mockShift, mockDateStr, mockDateObj, mockState, settings, null);
        expect(result.valid).toBe(true);
    });
});
