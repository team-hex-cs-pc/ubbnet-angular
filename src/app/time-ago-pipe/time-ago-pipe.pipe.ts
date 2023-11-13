import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  transform(dateString: string): string {
    const date = new Date(dateString);
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
