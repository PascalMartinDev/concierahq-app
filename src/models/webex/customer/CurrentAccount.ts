import type { TransactionLine, Consumer } from "../../../lsk/lsktypes";

export class CurrentAccount {
  protected _externalReferences: string[] = [];
  protected _clientCount: number = 0;
  protected _totalAmount: number = 0;
  protected _transactionLines: TransactionLine[] = [];
  protected _consumer: Consumer | undefined;
  protected _discounts: string[] = [];
  protected _currentInsertionPhase: number = 0;
  protected _identifier: string = '';
  protected _paidAmount: number = 0;
  protected _name: string = '';
  protected _fiscalIdentifier: string = '';

  // Getters:
  get externalReferences(): string[] {
    return this._externalReferences;
  }

  get totalAmount(): number {
    return this._totalAmount;
  }

  get transactionLines(): TransactionLine[] {
    return this._transactionLines;
  }

  get consumer(): Consumer | undefined {
    return this._consumer;
  }

  get discounts(): string[] {
    return this._discounts;
  }
  get currentInsertionPhase(): number {
    return this._currentInsertionPhase;
  }
  get paidAmount(): number {
    return this._paidAmount;
  }

  get name(): string {
    return this._name;
  }

  get fiscalIdentifier(): string {
    return this._fiscalIdentifier;
  }

  // Setters:
  set externalReferences(value: string[]) {
    this._externalReferences = value;
  }

  set totalAmount(value: number) {
    this._totalAmount = value;
  }

  set transactionLines(value: TransactionLine[]) {
    this._transactionLines = value;
  }

  set discounts(value: string[]) {
    this._discounts = value;
  }

  set currentInsertionsPhase(value: number) {
    this._currentInsertionPhase = value;
  }

  set identifier(value: string) {
    this._identifier = value;
  }

  set paidAmount(value: number) {
    this._paidAmount = value;
  }

  set name(value: string) {
    this._name = value;
  }

  set fiscalIdentifier(value: string) {
    this._fiscalIdentifier = value;
  }

  set consumer(value: Consumer | undefined) {
    this._consumer = value;
  }
}
