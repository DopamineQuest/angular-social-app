import {Pipe, PipeTransform, Sanitizer, SecurityContext} from '@angular/core';

@Pipe({
  name: 'searchTextFormatter'
})
export class SearchTextFormatterPipe implements PipeTransform {

  constructor(
    private sanitizer: Sanitizer
  ) {}

  transform(value: string, regex: any): any {
    return (this.replace(value, regex));
  }

  replace(str: any, regex: any) {
    let newStr = ""
    regex = regex.toLowerCase();
    let regexArray = [...new Set(regex.split(''))]

    for(let i = 0; i < str.length; i++) {
        if (regexArray.includes(str[i].toLowerCase())) {
          newStr += '<strong>' + str[i]+ '</strong>';
        } else {
          newStr+=str[i];
        }
      }
    return newStr;
  }

  sanitize(str: any) {
    return this.sanitizer.sanitize(SecurityContext.HTML, str);
  }
}
