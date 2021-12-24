//if n=1 stop
//if n is even return n/2
//if n is odd return 3n+1
//how many steps to 1?


const para = document.querySelector('p');
const input = document.querySelector('input');
const btn = document.querySelector('button');

btn.addEventListener('click', () => {
  para.textContent = 'Output: ';
  const num = input.value;
  input.value = '';
  input.focus();

para.textContent += `${Collatz(num)} `;;
function Collatz (num) {
    
    if (num == 1) 
        return 0
       else if (num % 2 == 0){           
      
           return 1+  Collatz(num/2)
        } else {
           
          return 1 +  Collatz(3*num +1)
            
        }
      

    }
 
}
)
