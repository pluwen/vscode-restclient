'use strict';

import { CancellationToken, Definition, DefinitionProvider, Location, Position, TextDocument } from 'vscode';
import { VariableUtility } from '../utils/variableUtility';

export class CustomVariableDefinitionProvider implements DefinitionProvider {
    public async provideDefinition(document: TextDocument, position: Position, token: CancellationToken): Promise<Definition> {
        if (!VariableUtility.isVariableReference(document, position)) {
            return;
        }

        let documentLines = document.getText().split(/\r?\n/g);

        let wordRange = document.getWordRangeAtPosition(position);
        let selectedVariableName = document.getText(wordRange);

        let locations = VariableUtility.getDefinitionRanges(documentLines, selectedVariableName);
        return locations.map(location => new Location(document.uri, location));
    }
}