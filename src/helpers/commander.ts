import commander, { program } from 'commander';

import { Translator } from '../Translations';
import fs from 'fs';

/**
 * The general flags that a CLI app accepts, when configured to used them.
 * Note that currently the default flags cannot be changed.
 */
interface CLIGeneralFlags {
    /** The help flags, both short and long */
    help: { short: string; long: string };
    /** The language set flags, both short and long */
    language: { short: string; long: string };
    /** The version information flags, both short and long */
    version: { short: string; long: string };
    /** The input file flags, both short and long */
    in: { short: string; long: string };
    /** The output file flags, both short and long */
    out: { short: string; long: string };
}

/**
 * A set of options for initially configure a CLI application.
 * If a translation is given
 */
interface CLIAppOptions {
    /**
     * The description texts (Or a description key if a [[Translator]] is provided)
     * that is used is the description of the different parts of the CLI.
     * The `name` and the `versionNumber` are expected to be the app name (No translation
     * is used, as the name should be the same through all the app), and the `versionNumber`
     * should be the version is the major.minor.patch.
     */
    texts: {
        name: string;
        versionNumber: string;
        help: string;
        language?: string;
        tool: string;
        version: string;
    };

    /**
     * A [[Translator]] used to translate the tool to different locales, both when
     * called with a language flag, and automatically at startup by auto-detecting
     * the user language by checking OS Environment variables.
     */
    translator?: Translator<any>;

    /**
     * The flag names to use in this application, if the flags differ in any way from
     * the default ones.
     *
     * The default flags include:
     * * help:  -h, --help
     * * version: -v, --version
     * * language selection: -l, --language
     * * input file for a command: -i, --in
     * * output file for a command: -o, --out
     */
    flags?: CLIGeneralFlags;
}

/**
 * A builder for a CLI command. May be the main command of the app ([[CLIApp]])
 * extends this class) or a sub-command.
 */
class CLICommandBuilder {
    private static SHORT_HELP_FLAG = '-h';
    private static SHORT_VERSION_FLAG = '-v';
    private static SHORT_LANG_FLAG = '-l';
    private static SHORT_INPUT_FLAG = '-i';
    private static SHORT_OUTPUT_FLAG = '-o';
    private static LONG_HELP_FLAG = '--help';
    private static LONG_VERSION_FLAG = '--version';
    private static LONG_LANG_FLAG = '--language';
    private static LONG_INPUT_FLAG = '--in';
    private static LONG_OUTPUT_FLAG = '--out';

    protected program: commander.Command;
    protected flags: CLIGeneralFlags;
    protected translator: Translator<any>;
    protected hasAction: boolean = false;
    protected currentArgs: any[];
    protected currentOptions: any;
    protected onReadErrorMsg: string;

    public constructor(
        cmdrProgram: commander.Command,
        translator?: Translator<any>,
        flags?: CLIGeneralFlags
    ) {
        this.program = cmdrProgram;
        this.translator = translator;

        // Set default flags, or use custom ones
        this.flags = flags ?? {
            help: {
                short: CLICommandBuilder.SHORT_HELP_FLAG,
                long: CLICommandBuilder.LONG_HELP_FLAG
            },
            language: {
                short: CLICommandBuilder.SHORT_LANG_FLAG,
                long: CLICommandBuilder.LONG_LANG_FLAG
            },
            version: {
                short: CLICommandBuilder.SHORT_VERSION_FLAG,
                long: CLICommandBuilder.LONG_VERSION_FLAG
            },
            in: {
                short: CLICommandBuilder.SHORT_INPUT_FLAG,
                long: CLICommandBuilder.LONG_INPUT_FLAG
            },
            out: {
                short: CLICommandBuilder.SHORT_OUTPUT_FLAG,
                long: CLICommandBuilder.LONG_OUTPUT_FLAG
            }
        };
    }

    public input(description: string, onReadErrorMsg: string): this {
        this.onReadErrorMsg = onReadErrorMsg;
        this.program.option(
            `${this.flags.in.short}, ${this.flags.in.long}, <filename>`,
            this.translator ? this.translator.translate(description) : description
        );
        return this;
    }

    public output(description: string): this {
        this.program.option(
            `${this.flags.out.short}, ${this.flags.out.long}, <filename>`,
            this.translator ? this.translator.translate(description) : description
        );
        return this;
    }

    public option(flags: string, description?: string, defaultValue?: string | boolean): this {
        this.program.option(
            flags,
            this.translator ? this.translator.translate(description) : description,
            defaultValue
        );
        return this;
    }

    public action(f: (cliapp: this, ...args: any[]) => void): this {
        this.program.action((...options: any[]) => {
            this.setCorrectLanguage(options);
            this.currentArgs = options.slice(0, options.length - 1);
            this.currentOptions = options[options.length - 1];
            f(this, ...options);
        });
        this.hasAction = true;
        return this;
    }

    public read(): string {
        if (this.currentOptions && this.currentOptions.in) {
            return this.readFileInput(this.currentOptions.in);
        }
        return this.currentArgs.join(' ');
    }

    public write(data: string): void {
        if (this.currentOptions && (this.currentOptions as any).out) {
            this.writeToFile((this.currentOptions as any).out, data);
        } else {
            this.writeToConsole(data);
        }
    }

    public readFileInput(fileName: string): string {
        this.ensureOrFailAndExit(
            fs.existsSync(fileName),
            this.translator
                ? this.translator.translate(this.onReadErrorMsg, { fileName })
                : this.onReadErrorMsg
        );
        return fs.readFileSync(fileName).toString();
    }

    public writeToFile(fileName: string, contents: string): void {
        fs.writeFileSync(fileName, contents, { flag: 'a' });
    }

    public writeToConsole(contents: string): void {
        // eslint-disable-next-line no-console
        console.log(contents);
    }

    public ensureOrFailAndExit(condition: boolean, error: string): void {
        if (!condition) {
            // eslint-disable-next-line no-console
            console.error(error);
            process.exit(1);
        }
    }

    protected setCorrectLanguage(options: any & { language: string }): void {
        if (options.language) {
            this.validateLanguageFlag(options.language);
            this.translator.setLocale(options.language);
        }
    }

    protected validateLanguageFlag(locale: string): void {
        const availableLangs = Object.keys(this.translator.getAvailableTranslations())
            .map((e) => '"' + e + '"')
            .join(' | ');
        this.ensureOrFailAndExit(
            this.translator.hasLocale(locale),
            this.translator.translate('cli.errors.language', { locale, availableLangs })
        );
    }
}

class CLIApp extends CLICommandBuilder {
    private processArgs: string[];
    private texts: Record<string, string>;

    public constructor(options: CLIAppOptions) {
        super(program, options.translator, options.flags);
        this.processArgs = process.argv;
        this.texts = options.texts;

        this.setLanguageIfConfigured(this.program);

        // Set up the program
        this.program.name(this.texts.name);
        this.program.version(
            this.texts.versionNumber,
            `${this.flags.version.short}, ${this.flags.version.long}`,
            this.translator ? this.translator.translate(this.texts.version) : this.texts.version
        );

        this.program.helpOption(
            `${this.flags.help.short}, ${this.flags.help.long}`,
            this.translator ? this.translator.translate(this.texts.help) : this.texts.help
        );
        this.program.addHelpCommand(false);
    }

    public run(): void {
        if (!this.hasAction) {
            this.program.action((options: any) => {
                this.setCorrectLanguage(options);
            });
        }
        this.program.parse(this.processArgs);
    }

    public command<TArguments, TLanguage>(
        name: string,
        description: string,
        f: (cmd: CLICommandBuilder) => void
    ): this {
        const newCmd = this.program
            .command(name)
            .description(this.translator ? this.translator.translate(description) : description);
        this.setLanguageIfConfigured(newCmd);
        f(new CLICommandBuilder(newCmd, this.translator, this.flags));
        return this;
    }

    private setLanguageIfConfigured(cmd: commander.Command): void {
        if (this.translator) {
            const language = this.getUserLocale();
            this.translator.setLocale(language);

            const availableLangs = Object.keys(this.translator.getAvailableTranslations())
                .map((e) => '"' + e + '"')
                .join(' | ');

            // Language flag is only set when a translator is being used.
            cmd.option(
                `${this.flags.language.short}, ${this.flags.language.long}, <locale>`,
                this.translator.translate(this.texts.language, { availableLangs }),
                language
            );
        }
    }

    private getUserLocale(): string {
        const envLocale = this.getUserEnvLocale();
        if (
            this.processArgs.indexOf(this.flags.language.short) >= 0 ||
            this.processArgs.indexOf(this.flags.language.long) >= 0
        ) {
            const langIndex =
                this.processArgs.indexOf(this.flags.language.short) >= 0
                    ? this.processArgs.indexOf(this.flags.language.short)
                    : this.processArgs.indexOf(this.flags.language.long);
            return this.processArgs.length > langIndex
                ? this.processArgs[langIndex + 1]
                : envLocale;
        }
        return envLocale;
    }

    private getUserEnvLocale(): string {
        const env = process.env ?? {};
        // Retrieve locale from environment
        const locale: string =
            env.LANG ?? env.LANGUAGE ?? env.LC_NAME ?? env.LC_ALL ?? env.LC_MESSAGES;
        // The locale from environment is returned as something like 'es_ES.UTF-8'.
        // The encoding is not needed at all for our translation system.
        const localeName = locale?.split('.')?.[0];
        // Now generate a list of locales in order of specificity,
        // e.g. for 'es_ES' a translation named 'es_ES' should be search first, then 'es'.
        const localeList = localeName !== undefined ? [localeName, localeName.split('_')[0]] : [];
        // Now check for each language in the list if such a locale exists
        if (localeList.length > 0) {
            for (const each of localeList) {
                if (this.translator.hasLocale(each)) {
                    return each;
                }
            }
        }
        return this.translator.getDefaultLocale();
    }
}

export type cli = CLIApp;
export const cli = (options: CLIAppOptions): CLIApp => new CLIApp(options);
