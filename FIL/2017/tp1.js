function square(x) { return x * x; }

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Collections
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Il est courant de vouloir itérer sur des collections (objets ou tableaux).
// Écrire des `for` ou des `while` devient rapidement fastidieux.  Les fonctions
// de cet exercice allègeront nos souffrances.

// La fonction `map` applique la fonction `fn` à tous les éléments du tableau
// `col`.  **Écrivez-la**.  Essayez de passer une chaîne de caractères au lieu
// d'un tableau.  Que se passe-t-il ?
function map(fn, col) {

}

map(square, [1,2,3]); //:
map(n => n + 10, [1,2,3]); //:
map(function(n) { return n + n; }, '123'); //:

// La fonction `filter` filtre les éléments d'un tableau suivant un prédicat
// (une fonction qui retourne un booléen).  **Écrivez** cette fonction.
// Testez-la avec un tableau, puis une chaîne.
function filter(pred, col) {

}

filter(n => n % 2 === 0, [1,2,3,4,5,6,7,8]); //:

// La fonction `find` renvoie le premier élément du tableau qui satisfait le
// prédicat.  Si aucun élément ne satisfait le prédicat, la fonction renvoie
// `undefined`.  **Écrivez-la**.
function find(pred, col) {

}

find(n => n > 2, [1,2,-1,0,-2,6,-5,8]); //:

// **Écrivez** la fonction `pluck` qui récupère la valeur de la propriété `prop`
// pour tous les éléments d'un tableau.
function pluck(prop, col) {

}

var books = [
  { title: 'Functional JavaScript', author: 'Michael Fogus' },
  { title: 'Effective JavaScript', author: 'David Herman' },
];

pluck('author', books); //:
pluck('length', ['123', '4567']); //:

// Certaines de ces fonctions sont disponibles dans l'API standard.
// cf. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Fonctions d'ordre supérieur
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Une fonction est une valeur comme une autre.  On peut mettre une fonction
// dans une variable, ou retouner une fonction:

const f0 = function (x) {
  return x + 2;
};
f0; //:
f0(1); //:

const f1 = function (f) {
  return function(x) {
    return f(x) + 10;
  };
}
f1; //:
f1(f0); //:
f1(f0)(1); //:

// **Écrivez** la fonction `compose` qui implémente `f ∘ g` (on suppose que `g`
// attend un seul argument).  C'est à dire, `compose` renvoie une fonction à un
// seul argument, qui applique la fonction `g` à cet argument, puis retourne
// l'application de la fonction `f` à ce résultat.
//
// (a → b) → (b → c) → (a → c)
function compose(f, g) {

}

compose(f0, f0)(0) === 4; //:
compose(square, f0)(8) === square(f0(8)); //:

// La fonction `add` retourne la somme de ses deux arguments.
//
// (a,b) → (a+b)
function add(x, y) {
  return x + y;
}

add(2,3) === 5; //:

// La currification est un classique de la programmation fonctionnelle.
// **Écrivez** sa version currifiée qui prend un seul argument, puis retourne
// une fonction qui attend le second argument et retourne la somme des deux.
//
// a → (b → (a+b))
function addCurry(x) {

}

addCurry(2); //:
addCurry(2)(3) === 5; //:

// Cette transformation peut être généralisée.  **Écrivez** la fonction curry2
// qui transforme une fonction de deux arguments en une fonction d'un argument
// qui attend le second avant de s'exécuter.
//
// ((a,b) → c) → (a → b → c)
function curry2(f) {

}

curry2(add); //:
curry2(add)(2); //:
curry2(add)(2)(3) === 5; //:

// Sa fonction inverse est `uncurry2`. Elle prend une fonction currifiée (de
// deux arguments), et retourne une fonction qui attend deux arguments et
// retourne le résultat de la fonction currifiée appliquée à ces arguments.
// **Écrivez-la**.
//
// (a → b → c) → ((a,b) → c)
function uncurry2(f) {

}

uncurry2(curry2(add))(2,3) === 5; //:
uncurry2(addCurry)(2,3) === 5; //:

// **Écrivez** la fonction `once`.  Elle retourne une fonction qui exécute `f`
// la première fois qu'elle est appelée, puis ne fait rien les appels suivants.
function once(f) {

}

let x = 0;
let g = once(function() { x += 1; });
g();
x === 1; //:
g();
x === 1; //:

// **Écrivez** la fonction `after`.  Elle retourne une fonction qui éxécute la
// fonction `f` seulement après `n` appels (et pas après).
function after(f, n) {

}

x = 0;
g = after(function() { x += 1; }, 2);
g();
x === 0; //:
g();
x === 1; //:

// **Écrivez** la fonction `memoize`.  Elle retourne une fonction qui sauvegarde
// le résultat de `f` pour chaque argument passé.
function memoize(f) {

}

// La version récursive naïve de `fibo` a une complexité exponentielle.  En
// utilisant `memoize`, la complexité redevient linéaire.
let fibo = memoize(function(n) {
  return n < 2 ? 1 : fibo(n - 1) + fibo(n - 2);
});

fibo(40) === 165580141; //:


//~~~~~~~~~~~~~~~~~~~~~~
// Pour aller plus loin
//~~~~~~~~~~~~~~~~~~~~~~
//
// Les fonctions `compose`, `curry2`, `uncurry2`, `once`, `after` et `memoize`
// peuvent être généralisées pour accepter des fonctions à un nombre quelconque
// d'arguments.  Pour ce faire, on peut récupérer la liste des arguments passés
// à la fonction avec l'opérateur `...`.

// Voici un exemple pour la fonction `compose` où `g` accepte un nombre
// quelconque d'arguments.
function compose_multi_args(f, g) {
  return function(...args) {
    return f(g(...args));
  };
}

compose_multi_args(square, add)(2,6) === 64; //:

// Faites de même pour `curry2`, `uncurry2`, `once`, `after` et `memoize`.
// Écrivez les tests, et vérifiez la cohérence des résultats.
