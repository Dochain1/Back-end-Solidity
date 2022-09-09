[![MIT License][license-shield]][license-url]
<a name="readme-top"></a>
    
<br />
<div align="center">
    <a href="https://github.com/Dochain1">
        <img src="https://raw.githubusercontent.com/Dochain1/frontend/dev/public/images/logo.png" alt="Logo" width="120" height="80">
    </a>
    <h3 align="center"> Backend Solidity Repository </h3>
    <p align="center">
        Dapp que permite almacenar archivos privados de forma segura
    <br/>
    <a href="https://github.com/Dochain1"><strong> Explora la documentación » </strong></a>
    <a href="https://goerli.etherscan.io/address/0xbc517cBa9D087B0777Bfd3b645A5C3Bde224B278#code"><strong> Último deploy » </strong></a>
    </p>
</div> 

<details>
  <summary>Tabla de contenido</summary>
  <ol>
    <li>
      <a href="#sobre-el-proyecto">Sobre el Proyecto</a>
      <ul>
        <li><a href="#construido-con">Construido con</a></li>
      </ul>
    </li>
    <li>
      <a href="#empezando">Empezando</a>
      <ul>
        <li><a href="#prerequisitos">Prerequisitos</a></li>
        <li><a href="#instalacion">Instalación</a></li>
      </ul>
    </li>
    <li><a href="#usage">Uso</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#licencia">Licencia</a></li>
    <li><a href="#autores">Autores</a></li>
  </ol>
</details>


## Sobre  el Proyecto


Problema:

Los documentos legales de un folder fisico legal estan vulnerables en cuanto a su integridad a causa de acceso al mismo por parte de personas no relacionadas al caso, por lo tanto existe la posibilidad de alterar el mismo
Solución:

Crear una dapp donde cada uno de los tipos de documentos se almacenen en un Blockchain y solo tengan acceso a cada portafolio las personas y/o entidades que solo deberian tener acceso (abogados, jueces y demás entidades involucrados en el caso).

<p align="right">(<a href="#readme-top">devuelta arriba</a>)</p>



### Construido con


* <img src="https://img.shields.io/badge/Solidity-%23363636.svg?style=for-the-badge&logo=solidity&logoColor=white" alt="Solidity">
* <img src="https://img.shields.io/badge/typescript%20-%23007ACC.svg?&style=for-the-badge&logo=typescript&logoColor=white"/>
* <img src="https://img.shields.io/badge/Ethers.js-7A98FB?style=for-the-badge&logo=Ethers.js&logoColor=white" alt="Ethers.js">
* <img src="https://img.shields.io/badge/Hardhat-fff04d?style=for-the-badge&logo=Hardhat&logoColor=white" alt="Hardhat">
* <img src="https://img.shields.io/badge/Chai-f6e8c9?style=for-the-badge&logo=Chai&logoColor=a40802" alt="Chai">
* <img src="https://img.shields.io/badge/OpenZeppelin-65aef8?&style=for-the-badge&logo=OpenZeppelin&logoColor=white" alt="OpenZeppelin"/>
* <img src="https://img.shields.io/badge/Chainlink-375BD2?style=for-the-badge&logo=Chainlink&logoColor=white" alt="Chainlink">

<p align="right">(<a href="#readme-top">devuelta arriba</a>)</p>

## Empezando
### Prerequisitos

* Git
    Sabrá que lo hizo bien si puede ejecutar `git --version` y ve una respuesta como `git version x.x.x`
* Nodejs
    Sabrá que ha instalado nodejs correctamente si puede ejecutar:
    `node --version` y obtenga una salida como: `vx.x.x`
* yarn 
    Sabrá que ha instalado yarn correctamente si puede ejecutar:
    `yarn --version` y obtener una salida como: `x.x.x`

### Instalación

1. Clona el repositorio
   ```sh
   git clone https://github.com/Dochain1/Back-end-Solidity
   ```
2. Instala las dependencias
   ```sh
   yarn
   ```
3. Crea un archivo `.env`  e introduce tus llaves, tienes el archvio `.env.example` como modelo, ejemplo: 
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```

<p align="right">(<a href="#readme-top">devuelta arriba</a>)</p>

## Uso

Deploy:
```sh
    yarn deploy
```
Testing:
```sh
    yarn test
```
Test Coverage:
```sh
    yarn coverage
```

<p align="right">(<a href="#readme-top">devuelta arriba</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Checking Signatures
- [x] Pausable         
- [x] ERC-721
- [x] Keppers          
- [ ] Meta Transactions   
- [ ] ERC-1155    
- [ ] Multi signature
- [ ] TimelockController 
- [ ] Governance/ DAO
- [ ] Upgrades



<p align="right">(<a href="#readme-top">devuelta arriba</a>)</p>



<!-- LICENSE -->
## Licencia

Distribuido bajo la licencia MIT. Consulte `LICENSE.txt` para obtener más información.

<p align="right">(<a href="#readme-top">devuelta arriba</a>)</p>

## Autores

👤 **José Piña**

- GitHub: [@pinajmr](https://github.com/pinajmr)
- Twitter: [@pinajmr]( https://twitter.com/pinajmr)
- LinkedIn: [José Piña](https://www.linkedin.com/in/pinajmr/)


<p align="right">(<a href="#readme-top">devuelta arriba</a>)</p>

[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt

