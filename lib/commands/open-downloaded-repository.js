const { join } = require('path')

class OpenDownloadedRepository {
  constructor (params) {
    this._configStore = params.configStore
    this._repositoryDisplayer = params.repositoryDisplayer
    this._vscWindow = params.vscWindow
    this._directoryLister = params.directoryLister
  }

  async execute () {
    const repositorySaveDirPath = this._configStore.repositorySaveDirectoryPath
    const repositories = await this._directoryLister.list(repositorySaveDirPath)
    const repository = await this._vscWindow.showQuickPick(repositories)
    if (!repository) return

    const repositoryPath = join(repositorySaveDirPath, repository)
    return this._repositoryDisplayer.display(repositoryPath)
  }
}

module.exports = OpenDownloadedRepository
