# Protocole de Validation UX — Middle Office SUP AIP & OpenAir

> **Objectif du test** : vérifier qu'un contributeur ou pilote peut utiliser l'application **de A à Z sans explication préalable**, en s'appuyant uniquement sur le libellé des menus, les repères visuels et la logique métier.

---

## 1. Posture de l'animateur pendant la séance (10–15 min)

- **Pas de démonstration préalable** : ouvrir directement l'interface (`ui/mockup.html`) sans expliquer le fonctionnement des 3 écrans.
- **Laisser chercher** : en cas de question (« Où dois-je cliquer ? »), répondre par « Où penseriez-vous trouver cette action ? ».
- **Penser à voix haute** : inviter le testeur à exprimer ce qu'il cherche, ce qu'il lit et ce qu'il comprend des badges ou statuts.
- **Observer les frictions** : toute hésitation de plus de 5 secondes signale un libellé, un regroupement ou un parcours à clarifier.

---

## 2. Scénario de validation en 4 missions

### Mission 1 — Screening mensuel et nettoyage (Écran 1)
> **Consigne donnée au testeur :**  
> *« On est en début de cycle (le 25 novembre). Tu dois faire le tri rapide par rapport au mois dernier : identifie les SUP AIP nouveaux ou modifiés, écarte ce qui ne concerne pas le vol à vue (VFR), et nettoie ceux qui ne sont plus valides. »*

- **Résultats attendus** :
  - Accès spontané à l'onglet **1. Screening Listing (Mensuel)**.
  - Identification des badges `Nouveau M`, `Modifié vs M-1` et de l'alerte rouge `VALIDE absent` sur `2026-180`.
  - Utilisation des filtres (`IFR seul`, `Alertes sur SUP VALIDE`) et bascule rapide via `→ IGNORE` et `→ EXPIRE`.

### Mission 2 — Sélection et ouverture d'un dossier (Écran 2 — Liste)
> **Consigne donnée au testeur :**  
> *« Sélectionne ton nom comme contributeur actif, puis ouvre le dossier `2026-202` pour l'examiner en détail. »*

- **Résultats attendus** :
  - Changement du contributeur dans le sélecteur en haut à droite.
  - Passage fluide vers **2. Revue SUP AIP & OpenAir** et ouverture de la fiche `2026-202`.

### Mission 3 — Lecture PDF, compliance technique et décision (Écran 2 — Fiche unique)
> **Consigne donnée au testeur :**  
> *« Tu es sur la fiche du `2026-202`. Lis le PDF, vérifie s'il y a une anomalie technique sur l'OpenAir proposé, corrige-le si nécessaire, laisse une note de revue et valide le dossier. »*

- **Résultats attendus** :
  - Lecture confortable du PDF sans scroll excessif.
  - Repérage immédiat du flag **`Compliance : 1 alerte(s)`** et compréhension du message *« Contour DP non fermé »*.
  - Ajout du point de fermeture (`DP 48:50:00 N 000:40:00 E`), passage du flag en **`Compliance : OK`**, saisie d'une note, validation (`VALIDE`) et retour via **`← Retour à la liste`**.

### Mission 4 — Compilation et livraison finale (Écran 3)
> **Consigne donnée au testeur :**  
> *« La revue est terminée. Génère et récupère le fichier final prêt à être diffusé aux pilotes. »*

- **Résultats attendus** :
  - Navigation vers **3. Compilation & Export Collectif**.
  - Contrôle des compteurs (vérifier que les SUP `EXPIRE` et `IGNORE` sont exclus) et téléchargement du fichier `.txt`.

---

## 3. Journal des sessions de test UX

### Session #1 — Date : `____-__-__` | Testeur : `____________` | Version : `v0.2.0-mockup-3ecrans`

| Mission | Réussite (Oui / Avec hésitation / Blocage) | Observation / Friction relevée | Action d'amélioration retenue |
| :--- | :--- | :--- | :--- |
| **1. Screening Listing** | | | |
| **2. Sélection & Liste** | | | |
| **3. Fiche unique & Compliance** | | | |
| **4. Export Collectif** | | | |

**Synthèse à retenir (3 points max) :**
1. *Ce qui est compris du premier coup :* 
2. *Point(s) à simplifier ou renommer :* 
3. *Impact sur `SPEC.md` / `core/` / `ui/` :*