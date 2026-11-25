# Prompt Maître — Middle Office SUP AIP & OpenAir (Parapente Cross Addict)

## Contexte & amorce de session
Reprise sur le Middle Office SUP AIP / OpenAir : le prototype interactif (`ui/mockup.html`, socle `ui/common/Theme.css` et `ui/common/Core.js`) est structuré en un workflow à 3 écrans (**1. Screening Listing mensuel**, **2. Revue SUP AIP & OpenAir** en parcours *Liste → Fiche dédiée*, **3. Compilation & Export Collectif**) en s'appuyant sur les exemples de `samples/` (`SUPAIP-LISTING-2026-11-24.pdf`, PDF individuels et fichiers OpenAir mensuel/individuel).

Avant toute nouvelle évolution d'écran ou passage au code modulaire (`config/`, `core/`, `ui/`, `build/`), vérifier l'état de validation de la maquette et les retours issus des tests utilisateurs.

---

## Documents de référence du projet
- `SPEC.md` : spécifications fonctionnelles, persona, principes UX, règles d'extraction PDF (notamment l'exclusion de la 1re colonne image du listing) et contrôles de compliance OpenAir (dont la section *À qualifier*).
- `TESTS_UX.md` : protocole de test d'utilisabilité sans explication préalable et journal des sessions de validation UX.
- `PROMPTS_LOG.md` : journal des décisions, arbitrages d'écran et enseignements capitalisés.

---

## Réflexe UX Design & Persona (obligatoire à chaque écran / évolution)
- Avant de concevoir ou modifier un écran, vérifier l'adéquation au **persona** (contributeur/pilote lisant des PDF parfois denses, sur Windows 11 ou Android, en ligne ou en `.html` autonome) et à la **tâche principale**.
- Donner la priorité visuelle et fonctionnelle à la lecture du PDF lorsque la validation l'exige.
- Limiter le scroll inutile et l'encombrement : favoriser des écrans focalisés sur l'enregistrement unique lorsque la compréhension est longue, avec un retour clair vers la liste.
- Toute décision UX importante ou rejet d'une proposition d'écran doit être noté brièvement dans `PROMPTS_LOG.md` pour capitaliser l'apprentissage.

---

## Règles de travail & d'apprentissage
- **Simplicité et modularité** : garder un socle UI sobre et partagé (`Theme.css`, `Core.js`), isoler les contrôles de compliance (`COMP-*`) pour les faire évoluer progressivement sans alourdir l'écran.
- **Validation par l'usage** : s'appuyer sur `TESTS_UX.md` pour confronter l'interface à un utilisateur sans guidage pas à pas, puis reporter les frictions et ajustements retenus dans `SPEC.md` et `PROMPTS_LOG.md`.
- **Capitalisation** : formuler des réponses claires, concrètes et orientées méthode afin d'aider à structurer durablement la conception et l'architecture du projet.