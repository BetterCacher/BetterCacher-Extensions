//
//  ViewController.swift
//  BetterCacher
//
//  Created by Jan Ole Wiedenroth on 30.06.21.
//

import Cocoa
import SafariServices.SFSafariApplication
import SafariServices.SFSafariExtensionManager

let appName = "BetterCacher"
let extensionBundleIdentifier = "org.bettercacher.extension"

class ViewController: NSViewController {

    @IBOutlet var appNameLabel: NSTextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.appNameLabel.stringValue = appName
        SFSafariExtensionManager.getStateOfSafariExtension(withIdentifier: extensionBundleIdentifier) { (state, error) in
            guard let state = state, error == nil else {
                // Insert code to inform the user that something went wrong.
                return
            }

            DispatchQueue.main.async {
                if (state.isEnabled) {
                    if (Locale.current.languageCode == "de") {
                        self.appNameLabel.stringValue = "Die BetterCacher-Erweiterung ist aktiviert. Du musst den Zugriff auf geocaching.com und bettercacher.org erlauben, damit die Erweiterung funktionieren kann."
                    } else {
                        self.appNameLabel.stringValue = "The \(appName) extension is activated. You have to allow access to geocaching.com and bettercacher.org for the extension to work."
                    }
                } else {
                    if (Locale.current.languageCode == "de") {
                        self.appNameLabel.stringValue = "Die BetterCacher-Erweiterung ist derzeit deaktiviert. Du kannst sie in den Einstellungen für Safari-Erweiterungen aktivieren."
                    } else {
                        self.appNameLabel.stringValue = "The \(appName) extension is deactivated. You can enable it in the Safari Extensions Settings."
                    }
                }
            }
        }
    }
    
    @IBAction func openSafariExtensionPreferences(_ sender: AnyObject?) {
        SFSafariApplication.showPreferencesForExtension(withIdentifier: extensionBundleIdentifier) { error in
            guard error == nil else {
                // Insert code to inform the user that something went wrong.
                return
            }

            DispatchQueue.main.async {
                NSApplication.shared.terminate(nil)
            }
        }
    }

}
