import { Formatter, formatterHelpers } from '@cucumber/cucumber';
const { GherkinDocumentParser } = formatterHelpers;

class CustomFormatter extends Formatter {
    constructor(options) {
        super(options);
        options.eventBroadcaster.on('envelope', (envelope) => {
            if (envelope.testRunFinished) {
                this.logFilePaths();
            }
        });
    }

    logFilePaths() {
        const gherkinDocuments = GherkinDocumentParser.parseGherkinDocuments(this.eventDataCollector.gherkinDocumentMap);
        gherkinDocuments.forEach((doc) => {
            const filePath = `file:///${doc.uri.replace(/^file:\/+/, '')}`;
            console.log(`Feature file: ${filePath}`);
        });
    }
}

export default CustomFormatter;