
# Configuration Mini-Game

## ⚠️ Attention
> Chaque jeu doit au préalable être ouvert manuellement depuis le [back office](#).

<br />

## 🎮 Cahier des charges des Jeux

### 1️⃣ Gotaga Room **(popcorn game)**
-  [x]  `X` objets à trouver
-  [x] Entrer le **nom d'un objet** pour le trouver
-  [x] Le nom de l'objet doit matcher avec **l'ensemble des possibilités**
-  [x] Si ❌ et `X` erreurs alors **recommencer** au début
-  [x] Si ✅ alors **afficher un marqueur** sur l'objet
-  [x] Si ⭐️ VIP [^vip] alors possibilité de **voir les marqueurs** sur les objets

### <a id="quiz-video"></a> 2️⃣ Quiz Vidéo
-  [x]  `X` questions avec vidéo
-  [x] Entrer la **réponse** à une question
-  [x] Si ❌ alors **attendre**  `X` secondes avant de passer à la prochaine vidéo
-  [x] Si ✅alors  **passer** à la prochaine vidéo
-  [x] Si ⭐️ VIP[^vip] alors **pas** de mallus

### 3️⃣ Enigme
-  [x] Vidéo / image pour annoncer l'énigme
-  [x] Entrer le **mot de passe** à l'énigne
-  [x] Si ⭐️ VIP[^vip] alors possibilité de **voir un indice**

<br/>

## 💾 Configuration des jeux

|FIELD|TYPE|DESCRIPTION|
|:-:|:-:|:-:|
|-|[GameConfig](#game-config)[]|liste des configurations des jeux|

### <a id="game-config"></a>**GameConfig**

|FIELD|TYPE|REQUIRED|EXAMPLE|DESCRIPTION|
|:-:|:-:|:-:|:-:|:-:|
|slug|`string`|✅|`"gotaga_video"`|slug du jeu (doit être unique)|
|name|`string`|✅|`"gotaga video"`|nom du jeu|
|begin|`number`|✅|`1562683573`|[timestamp](http://www.timestamp.fr/) du début du jeu<br/>*(À titre indicatif l'ouverture finale doit être effectué depuis le [back office](#))*|
|description|`string`|✅|`"lorem ipsum"`|description du jeu|
|thumbnail|`string`|✅ **(TBC)**|`"https://www.google.com/photos.jpg"`|url|
|answers|[Answer](#answer)[]|✅|/|liste des réponses possibles|
|payload|[Payload](#payload)|❌|/|variables supplémentaires pour le jeu|
|option|[Option](#option)|❌|/|options supplémentaires du jeu|


### <a id="answer"></a>**Answer**

|FIELD|TYPE|REQUIRED|EXAMPLE|DEFAULT|DESCRIPTION|
|:-:|:-:|:-:|:-:|:-:|:-:|
|value|`string`|✅|`"tee-shirt"`|/|la bonne réponse|
|threshold|`number`|❌|`.5`|`0`|Seuil d'erreur utilisé par [fuse.js](https://fusejs.io/) *(threshold)*|
|accepted|`string[]`|❌|`["pull", "veste"]`|`[]`|l'ensemble des réponses acceptées|
|success_data|`object`|❌|`{"x": 12, "y": 253}`|`{}`|informations supplémentaires envoyées lors d'une bonne réponse|


### <a id="payload"></a>**Payload**

|FIELD|TYPE|REQUIRED|DEFAULT|EXAMPLE|DESCRIPTION|
|:-:|:-:|:-:|:-:|:-:|:-:|
|default|`object`|❌|`{}`|`{ "interval": 20000, "question": "?" }`|information supplémentaire sur le jeu|
|vip|`object`|❌|`{}`|`{ "interval": 0 }`|pareil que `default` mais uniquement disponible pour les **vip[^vip]**|

Le payload vous permet de transmettre davantage d'informations sur un jeu (eg. bonus/malus, titre, proposition, ...), il est divisé en 2 parties : 
 - **default**: Informations disponibles pour tout type de joueur **(default[^default] et vip[^vip])**
 - **vip**: Informations disponibles seulement pour les joueurs ayant utilisé un bonus **(vip)[^vip]**.

Le  **payload final** correspond au **default** (+ **vip** si le joueur est vip).

```javascript
const finalPayload = {
	...config.payload.default,
	...(isVip && config.payload.vip),
};
```

Le **payload final** peut être lu par le server et est enfin renvoyé au **Client**.

> Si vous souhaitez que certaines informations restent privées et ne soit pas renvoyées au client, veillez à les préfixer par **"_"**.
> 
> Example: `{ "default": { "_secret": "it's secret" } }`

### <a id="option"></a>**Option**

|FIELD|TYPE|REQUIRED|DEFAULT|DESCRIPTION|
|:-:|:-:|:-:|:-:|:-:|
|ordered|`boolean`|❌|`false`|Précise si l'ordre de réponse des questions est important|

<br />

## <a id="hooks"></a> ⚓️ Hooks

Les hooks sont de petits modules côté serveur. Ils permettent de mettre en place des règles métiers spécifiques à un jeu.

Par exemple dans le jeu [Quiz Vidéo](#quiz-video): 
- Nous devons nous assurer qu'un joueur **default**[^default] ne puisse répondre qu'au minimum tous les **`X`** secondes. 
- Cependant un joueur **vip**[^vip] n'a pas ce mallus. Dans notre exemple nous allons imaginer qu'un  **vip**[^vip] dois attendre **`Y`** secondes.

Pour répondre à ces règles métiers nous allons mettre en place un **[Hook](#hooks)** ainsi qu'un **[Payload](#payload)**.

```js
// example-config.json
{
	"name": "escape game",
	"payload": {
		"default": {
			"interval": 20000, //ms
		},
		"vip": {
			"interval": 1000, //ms
		}
	}
	// ...
}
```

```javascript
// quizHook.ts
import createError from 'http-errors';
import httpStatus from 'http-status-codes';

export const before = ({ game, lastAnswer, isVip }) => {
  const { payload } = game;
  const mergedPayload = {
		...payload.default,
		...(isVip && payload.vip),
	};
  const { interval } = mergedPayload;
  const now = new Date();

  if (lastAnswer
  && !lastAnswer.isValid
  && now.getTime() - lastAnswer.updatedAt.getTime() <= interval) {
    throw createError(httpStatus.FORBIDDEN, `you must wait at less than ${interval} ms`);
  }
};
```

Les hooks peuvent répondre à 3 différents lifecycles:
 - `before`: Règle métier à executer **avant** qu'une réponse ne soit vérifier.
 - `after`: Règle métier à executer **après** qu'une réponse soit validé et est **correct**.
 - `error`: Règle métier à executer **après** qu'une réponse soit vérifié et est **incorrect**.

[Examples here](../src/modules/Game/hooks/index.ts)

[^default]: **default**: Le rang des tous les joueurs par defaut.
[^vip]: **vip**: Le rang vip est unique à chaque jeu, il correspond aux joueurs ayant utilisé un bonus sur un jeu.
