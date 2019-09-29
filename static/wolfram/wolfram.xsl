<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method='html' version='1.0' encoding='UTF-8' indent='yes' />

<xsl:template match="/">
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body>
        <style>
a, legend, summary {
    font-size: 85%;
}

summary {
    margin: 0 -1.5em;
}

details {
    margin: 0.5em 0;
    padding: 0 1.5em;
}

fieldset {
    border-width: 1px;
}

.pod {
}

.subpod {
    border-style: dashed;
}
        </style>
<xsl:for-each select="queryresult/pod">
        <fieldset class="pod">
            <legend><xsl:value-of select="@title" /></legend>
<xsl:for-each select="subpod">
            <fieldset class="subpod">
                <legend><xsl:value-of select="@title" /></legend>
<xsl:apply-templates />
            </fieldset>
</xsl:for-each>
<xsl:for-each select="states">
            <details>
                <summary>More operations</summary>
<xsl:apply-templates />
            </details>
</xsl:for-each>
        </fieldset>
</xsl:for-each>
    </body>
</html>
</xsl:template>

<xsl:template match="img">
<details>
    <summary>Image</summary>
    <img src="{@src}" alt="{@alt}" title="{@title}" />
</details>
</xsl:template>

<xsl:template match="plaintext">
<details open="open">
    <summary>Plain Text</summary>
    <pre><xsl:apply-templates /></pre>
</details>
</xsl:template>

<xsl:template match="state">
<a href="javascript:window.parent._onStateChange('{@input}')"><xsl:value-of select="@name" /></a><br />
</xsl:template>

<xsl:template match="link">
<a target="_blank" rel="noopener noreferrer" href="{@url}" title="{@title}"><xsl:value-of select="@text" /></a><br />
</xsl:template>

<xsl:template match="infos">
<xsl:for-each select="info">
    <details>
        <summary><xsl:value-of select="@text" /></summary>
<xsl:apply-templates />
    </details>
</xsl:for-each>
</xsl:template>

<xsl:template match="*">
<!-- ignore any unknown element -->
</xsl:template>

</xsl:stylesheet>