## Contributing

First off, thanks for considering contributing to this project! It's people like you that make this project a great tool.

### Where do I go from here?

If you've noticed a bug or have a feature request, [make one]! It's
generally best if you get confirmation of your bug or approval for your feature
request this way before starting to code.

### Fork & create a branch

If this is something you think you can fix, then [fork this project] and create
a branch with a descriptive name.

A good branch name would be (where issue #325 is the ticket you're working on):

```sh
git checkout -b 325-condense-storage-entries
```

### Get the test suite running

Make sure you're using a v16 version of node.js (v16) with a current version of `node.js`:

Now install the development dependencies:

```sh
npm install
```

To update the built extension run:

```sh
npm run build
```

The build script will make a extension ready for [loading in unpacked mode] to a Chromium browser.

### Implement your fix or feature

At this point, you're ready to make your changes! Feel free to ask for help;
everyone is a beginner at first :smile_cat:

Make sure you update the version number in `manifest.json`. Here's how to do that:

- The last digit (e.g. 3.2.3.**14**) is for CI releases, and you should reset that number to 0.
- The second to last digit (e.g. 3.2.**3**.14) is for patches. If you're fixing a bug, increment this number. (e.g. 3.2.4.0)
- The second digit (e.g. 3.**2**.3.14) is for new features. If you're adding a new option, or adding a new functionality to
  a script, increment this digit and reset the digits right of it to 0. (3.3.0.0)
- The first digit (e.g. **3**.2.3.14) is for very major releases. If your change doesn't fall into the other catagories,
  increment this digit and reset the digits right of it to 0. You should also open a discussion for this. (e.g. 4.0.0.0)

### Make a Pull Request

At this point, you should switch back to your main branch and make sure it's up to date with our main branch:

```sh
git remote add upstream git@github.com:geofs-extensions/autoland.git
git checkout main
git pull upstream main
```

Then update your feature branch from your local copy of main, and push it!

```sh
git checkout 325-add-japanese-translations
git rebase main
git push --set-upstream origin 325-add-japanese-translations
```

Finally, go to GitHub and [make a Pull Request][] :D

Github Actions will run a test suite against your PR. We care about quality, so your PR won't be merged until all tests pass.
We'll also manually test the extension before approving your PR.
The tests can mostly be satisfied by using the `npm run build` script.

### Keeping your Pull Request updated

If a maintainer asks you to "rebase" your PR, they're saying that a lot of code has changed, and that you need to update your branch so it's easier to merge.

If a maintainer asks you to "rebase" your PR, they're saying that a lot of code
has changed, and that you need to update your branch so it's easier to merge.

To learn more about rebasing in Git, there are a lot of [good][git rebasing]
[resources][interactive rebase] but here's the suggested workflow:

```sh
git checkout 325-add-japanese-translations
git pull --rebase upstream main
git push --force-with-lease 325-add-japanese-translations
```

### Merging a PR (maintainers only)

A PR can only be merged into main by a maintainer if:

- It is passing CI.
- It has been approved by at least two maintainers. If it was a maintainer who
  opened the PR, only one other approval is needed.
- It has no requested changes.
- It is up to date with current main.

Any maintainer is allowed to merge a PR if all of these conditions are met.

Thanks to the [Active Admin Contributing guide] for inspiring this Contributing guide!

[active admin contributing guide]: https://github.com/activeadmin/activeadmin/blob/HEAD/CONTRIBUTING.md
[make one]: https://github.com/GeoFS-Extensions/autoland/issues/new/choose
[fork this project]: https://help.github.com/articles/fork-a-repo
[loading in unpacked mode]: https://stackoverflow.com/a/24577660
[make a pull request]: https://help.github.com/articles/creating-a-pull-request
[git rebasing]: http://git-scm.com/book/en/Git-Branching-Rebasing
[interactive rebase]: https://help.github.com/en/github/using-git/about-git-rebase
