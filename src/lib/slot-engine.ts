export interface Slot {
  id: string;
  label: string;
  startTime: string;
  endTime: string;
  startHour: number;
  endHour: number;
  isBlocked: boolean;
  blockReason?: string;
  isAvailable: boolean;
  type: 'grooming' | 'boarding';
}

/**
 * Generate grooming slots for a given date.
 * Operating window: 9:00 AM – 6:00 PM (1-hour slots)
 * All slots available — no lunch break.
 */
export function generateGroomingSlots(date: Date): Slot[] {
  const slots: Slot[] = [];
  const dateStr = date.toISOString().split('T')[0];

  for (let hour = 9; hour <= 17; hour++) {
    const startTime = `${hour.toString().padStart(2, '0')}:00`;
    const endHour = hour + 1;
    const endTime = `${endHour.toString().padStart(2, '0')}:00`;

    const formatHour = (h: number) => {
      if (h === 0 || h === 12) return `12:00 ${h < 12 ? 'AM' : 'PM'}`;
      return `${h > 12 ? h - 12 : h}:00 ${h >= 12 ? 'PM' : 'AM'}`;
    };

    slots.push({
      id: `grooming-${dateStr}-${hour}`,
      label: `${formatHour(hour)} – ${formatHour(endHour)}`,
      startTime,
      endTime,
      startHour: hour,
      endHour: endHour,
      isBlocked: false,
      isAvailable: true,
      type: 'grooming',
    });
  }

  return slots;
}

export interface BoardingShift {
  id: string;
  label: string;
  description: string;
  startTime: string;
  endTime: string;
  startHour: number;
  endHour: number;
  duration: string;
  isAvailable: boolean;
  type: 'boarding';
  shiftType: 'shift1' | 'shift2' | 'fullday';
}

/**
 * Generate boarding shifts for a given date.
 * Shift 1: 08:00 AM – 01:00 PM (Half-Day)
 * Shift 2: 02:00 PM – 07:00 PM (Half-Day)
 * Full Day: 24-hour cycle from check-in time
 */
export function generateBoardingShifts(date: Date): BoardingShift[] {
  const dateStr = date.toISOString().split('T')[0];

  return [
    {
      id: `boarding-${dateStr}-shift1`,
      label: 'Morning Shift',
      description: '8:00 AM – 1:00 PM',
      startTime: '08:00',
      endTime: '13:00',
      startHour: 8,
      endHour: 13,
      duration: '5 hours',
      isAvailable: true,
      type: 'boarding',
      shiftType: 'shift1',
    },
    {
      id: `boarding-${dateStr}-shift2`,
      label: 'Afternoon Shift',
      description: '2:00 PM – 7:00 PM',
      startTime: '14:00',
      endTime: '19:00',
      startHour: 14,
      endHour: 19,
      duration: '5 hours',
      isAvailable: true,
      type: 'boarding',
      shiftType: 'shift2',
    },
    {
      id: `boarding-${dateStr}-fullday`,
      label: 'Full Day Boarding',
      description: '24-hour cycle from check-in',
      startTime: '08:00',
      endTime: '08:00',
      startHour: 8,
      endHour: 8,
      duration: '24 hours',
      isAvailable: true,
      type: 'boarding',
      shiftType: 'fullday',
    },
  ];
}

/**
 * Generate the next N days for date selection
 */
export function getAvailableDates(count: number = 7): Date[] {
  const dates: Date[] = [];
  const today = new Date();

  for (let i = 1; i <= count; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }

  return dates;
}

/**
 * Format a date for display
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}
