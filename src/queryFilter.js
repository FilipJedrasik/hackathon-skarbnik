export default (data, base) => {
  if(base.indexOf('/') === -1){
    base += '/';
  }

  const dataPairs = omitEmptyValues(data);

  if(JSON.stringify(dataPairs) === JSON.stringify({})){
    return base;
  }

  if(base.substr(-1) === '/'){
    base += '?';
  }

  const Rep = new Replacer(base);
  for(let key in dataPairs) {
    Rep.setPair(key, dataPairs[key]);
  }

  return Rep.url;
};

class Replacer {
  constructor(url){
    let queries = url.split('?');
    this.start = queries[0];
    this.couples = queries[1].split('&');
    this.pairs = [];
    for(let i = 0; i < this.couples.length; i++){
      this.pairs[i] = this.couples[i].split('=');
    }
  }

  setPair(key, value){
    let index = -1;
    for(let i = 0, len = this.pairs.length; i < len; i++) {
      if(key === this.pairs[i][0]){
        index = i;
        break;
      }
    }

    if(index === -1){
      if(this.pairs.length > 0 && this.pairs[this.pairs.length - 1].length === 2){
        if(this.pairs[this.pairs.length - 1][1].substr(-1) !== '&'){
          //this.pairs[this.pairs.length - 1][1] += '&';
        }
      }

      this.pairs.push([key, value]);
    } else {
      this.pairs[index][1] = value;
    }
  }

  get url(){
    let joinedPairs = [];

    for(let pair of this.pairs){
      if(pair.length === 2){
        joinedPairs.push(pair.join('='));
      }
    }
    const idk = this.start + '?' + joinedPairs.join('&');
    return idk;
  }
}

const omitEmptyValues = obj => {
  let filtered = {};
  for(let key in obj){
    if(obj[key] === null || obj[key] === undefined || obj[key] === '' || (typeof obj[key] === "string" && obj[key].trim() === '')){
      continue;
    }
    filtered[key] = obj[key];
  }
  return filtered;
};