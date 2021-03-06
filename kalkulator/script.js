var liczby = document.querySelectorAll('.liczba')
var dzialania = document.querySelectorAll('.dzialanie')
var usun = document.querySelector ('.usun')
var rownosc = document.querySelector('.rownosc')
var cofnij = document.querySelector ('.cofnij')
var poprzedniWynik = document.querySelector ('.podglad-dzialan')
var obecnyWynik = document.querySelector ('.teraz-liczone')

let terazLiczone = ''
let podgladDzialan = ''
let operacja = undefined

const oblicz = () => 
{
	let licz
	if(!podgladDzialan || !terazLiczone)
		{
			return	
		}
	const poprzednie = parseFloat(podgladDzialan)
	const teraz = parseFloat(terazLiczone)
	
	if(isNaN(poprzednie) || isNaN(teraz))
		{
			return
		}
	switch(operacja)
		{
		case '+':
				licz = poprzednie + teraz
			break;
			
		case '-':
				licz = poprzednie - teraz
			break;
			
		case '×':
				licz = poprzednie * teraz
			break;	
		
		case '÷':
			if(teraz === 0) 
			{
				usunWynik()
				return
			}
			licz = poprzednie / teraz
			break;	
		
		case '√':
				licz = Math.pow(poprzednie, 1/teraz)
			break;
			
		case '%':
				licz = poprzednie / 100 * teraz
			break;
			
		case 'x²':
				licz = Math.pow(poprzednie, teraz)
			break;
			
		case 'log':
				licz = Math.log(poprzednie) / Math.log(teraz)
			break;
			
		default: 
			return
		}
		
	terazLiczone = licz
	operacja = undefined
	podgladDzialan = ''
	
}

const wyborDzialania = (dzialanie) => 
{
	if(terazLiczone === '')
		{
			return
		}
	if(podgladDzialan !== '')
		{
			const poprzednie = poprzedniWynik.innerText
			if(terazLiczone.toString() === '0' && poprzednie[poprzednie.length-1] === '÷')
			{
				usunWynik()
				return
			}
			oblicz()
		}
	operacja = dzialanie
	podgladDzialan = terazLiczone
	terazLiczone = ''
}

const nowyWynik = () => 
{
	obecnyWynik.innerText = terazLiczone
	if(operacja != null) 
		{
			poprzedniWynik.innerText = podgladDzialan + operacja
		}
	else
		{
			poprzedniWynik.innerText = ''
		}
	
}

const dolaczLiczbe = (liczba) => 
{
	if(liczba === '•')
		{
			if(terazLiczone.includes('.')) 
			{
				return
			}
			liczba = '.'
		}
	terazLiczone = terazLiczone.toString() + liczba.toString()
}

const cofnijLiczbe = () =>
{
	terazLiczone = terazLiczone.toString().slice(0, -1)
}

const usunWynik = () =>
{
	terazLiczone = ''
	podgladDzialan = ''
	operacja = undefined
}

liczby.forEach((liczba) =>
{
	liczba.addEventListener('click', () => 
	{
		dolaczLiczbe(liczba.innerText)
		nowyWynik()
	})
});

cofnij.addEventListener('click', () =>
{
	cofnijLiczbe()
	nowyWynik()
})

dzialania.forEach((dzialanie) =>
{
	dzialanie.addEventListener('click', () =>
	{
		wyborDzialania(dzialanie.innerText)
		nowyWynik()
	})
});

rownosc.addEventListener('click', () =>
{
	oblicz()
	nowyWynik()
})

usun.addEventListener('click', () =>
{
	usunWynik()
	nowyWynik()
})