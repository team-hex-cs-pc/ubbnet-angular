import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  transform(dateString: string): string {
    // Split the date string into day, month, and year
    const parts = dateString.split('-');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are zero-based (0-11)
    const year = parseInt(parts[2], 10);

    // Construct a new Date object with the parts in a compatible format (YYYY, MM, DD)
    const date = new Date(year, month, day);

    const now = new Date();

    const diffInMilliseconds = now.getTime() - date.getTime();
    const secondsAgo = Math.floor(diffInMilliseconds / 1000);
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);

    if (secondsAgo < 60) {
      return secondsAgo + ' seconds ago';
    } else if (minutesAgo < 60) {
      return minutesAgo + ' minutes ago';
    } else if (hoursAgo < 24) {
      return hoursAgo + ' hours ago';
    } else {
      // Format the date with valid DateTimeFormatOptions
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' };
      return date.toLocaleDateString(undefined, options);
    }
  }
}
