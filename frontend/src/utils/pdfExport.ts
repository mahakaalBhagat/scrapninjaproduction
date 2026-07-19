import { CartItem } from '@/types/cart';
import { PDFDocument, rgb, PDFPage } from 'pdf-lib';

interface ESGMetrics {
  carbonSaved: string | number;
  landfillWasteReduced: string | number;
  waterSaved: string | number;
  energySaved: string | number;
}

interface ESGScores {
  environmental: number;
  social: number;
  governance: number;
  overall: number;
}

interface ComplianceData {
  complianceCertifications: string[];
  regulatoryStatus: 'compliant' | 'pending' | 'non-compliant';
  complianceScore: number;
  auditResult?: string;
  certificateStatus?: string;
  riskLevel?: 'low' | 'medium' | 'high';
}

interface PickupInfo {
  pickupId?: string;
  collectionDate?: string;
  vendorName?: string;
  customerName?: string;
  pickupAddress?: string;
  vehicleNumber?: string;
  driverName?: string;
}

interface OrganizationInfo {
  companyName: string;
  contactPerson?: string;
  email: string;
  phone: string;
  facilityAddress: string;
  businessRegistrationNumber?: string;
}

// ============================================================================
// COMPREHENSIVE ESG COMPLIANCE REPORT PDF GENERATOR
// Professional multi-page layout with complete dashboard data
// ============================================================================

interface PageContext {
  pdfDoc: PDFDocument;
  page: PDFPage | null;
  pageWidth: number;
  pageHeight: number;
  marginLeft: number;
  marginRight: number;
  marginTop: number;
  marginBottom: number;
  contentWidth: number;
  contentStart: number;
  yPos: number;
  logoImage?: any; // Embedded PNG image
  colors: {
    primaryGreen: ReturnType<typeof rgb>;
    secondaryGreen: ReturnType<typeof rgb>;
    lightGreen: ReturnType<typeof rgb>;
    darkText: ReturnType<typeof rgb>;
    lightText: ReturnType<typeof rgb>;
    borderColor: ReturnType<typeof rgb>;
    accentBlue: ReturnType<typeof rgb>;
    accentPurple: ReturnType<typeof rgb>;
    accentRed: ReturnType<typeof rgb>;
    white: ReturnType<typeof rgb>;
    footerBg: ReturnType<typeof rgb>;
  };
  spacing: {
    sectionGap: number;
    elementGap: number;
    cardPadding: number;
    lineHeight: number;
  };
  typography: {
    companyName: number;
    reportTitle: number;
    sectionTitle: number;
    cardTitle: number;
    labelText: number;
    bodyText: number;
    smallText: number;
    tinyText: number;
  };
}

export const generateESGReportPDF = async (
  cartItems: CartItem[],
  metrics: ESGMetrics,
  scores: ESGScores,
  compliance?: ComplianceData,
  pickupInfo?: PickupInfo,
  organizationInfo?: OrganizationInfo
) => {
  try {
    console.log('Comprehensive ESG Compliance Report generation started...');

    const pdfDoc = await PDFDocument.create();
    
    // Initialize context object
    const context: PageContext = {
      pdfDoc,
      page: null,
      pageWidth: 595,
      pageHeight: 842,
      marginLeft: 40,
      marginRight: 40,
      marginTop: 50,
      marginBottom: 50,
      contentWidth: 515,
      contentStart: 40,
      yPos: 792,
      logoImage: undefined,
      colors: {
        primaryGreen: rgb(0.047, 0.365, 0.235), // #0B5D3B
        secondaryGreen: rgb(0.09, 0.65, 0.45), // #17A673
        lightGreen: rgb(0.92, 0.99, 0.96),
        darkText: rgb(0.133, 0.133, 0.133), // #222222
        lightText: rgb(0.4, 0.4, 0.4), // #666666
        borderColor: rgb(0.851, 0.851, 0.851), // #D9D9D9
        accentBlue: rgb(0.15, 0.33, 0.76),
        accentPurple: rgb(0.55, 0.36, 0.96),
        accentRed: rgb(0.8, 0.2, 0.2),
        white: rgb(1, 1, 1),
        footerBg: rgb(0.047, 0.365, 0.235), // #0B5D3B
      },
      spacing: {
        sectionGap: 14,
        elementGap: 8,
        cardPadding: 10,
        lineHeight: 12,
      },
      typography: {
        companyName: 24,
        reportTitle: 18,
        sectionTitle: 14,
        cardTitle: 11,
        labelText: 9,
        bodyText: 10,
        smallText: 8,
        tinyText: 7,
      },
    };

    // Load and embed logo image
    try {
      const logoResponse = await fetch('/ScrapNinja Logo Without Background.png');
      if (logoResponse.ok) {
        const logoBuffer = await logoResponse.arrayBuffer();
        context.logoImage = await pdfDoc.embedPng(logoBuffer);
        console.log('✅ Logo image embedded');
      }
    } catch (err) {
      console.warn('⚠️ Could not load logo image:', err);
    }

    // Helper function: add new page
    const addNewPage = (): PDFPage => {
      context.page = context.pdfDoc.addPage([595, 842]);
      context.yPos = context.pageHeight - context.marginTop;
      return context.page;
    };

    // Helper function: safely draw text
    const drawText = (
      text: string,
      x: number,
      y: number,
      fontSize: number,
      color: ReturnType<typeof rgb>,
      options?: { bold?: boolean }
    ) => {
      if (!context.page) return;
      try {
        const safeText = String(text).replace(/[^\x20-\x7E\n\t]/g, '?'); // ASCII-only
        // Don't pass font - let pdf-lib use default. Fonts must be embedded to work.
        context.page.drawText(safeText, {
          x,
          y,
          size: fontSize,
          color,
        });
      } catch (err) {
        console.error(`Error drawing text "${text}":`, err);
      }
    };

    // Helper function: measure text width
    const getTextWidth = (text: string, fontSize: number): number => {
      return String(text).length * (fontSize * 0.5);
    };

    // Helper function: draw centered text
    const drawCenteredText = (
      text: string,
      x: number,
      y: number,
      fontSize: number,
      color: ReturnType<typeof rgb>,
      options?: { bold?: boolean }
    ) => {
      const textWidth = getTextWidth(text, fontSize);
      const centerX = x + (context.contentWidth / 2 - textWidth / 2);
      drawText(text, centerX, y, fontSize, color, { bold: options?.bold });
    };

    // Helper function: draw line
    const drawLine = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      thickness: number = 1,
      color: ReturnType<typeof rgb> = context.colors.borderColor
    ) => {
      if (!context.page) return;
      context.page.drawLine({
        start: { x: x1, y: y1 },
        end: { x: x2, y: y2 },
        thickness,
        color,
      });
    };

    // Helper function: draw rectangle
    const drawRect = (
      x: number,
      y: number,
      width: number,
      height: number,
      bgColor: ReturnType<typeof rgb>,
      borderColor?: ReturnType<typeof rgb>,
      borderWidth: number = 0
    ) => {
      if (!context.page) return;
      context.page.drawRectangle({
        x,
        y,
        width,
        height,
        color: bgColor,
        borderColor: borderColor || bgColor,
        borderWidth,
      });
    };

    // Helper function: check if we need a new page
    const checkPageBreak = (spaceNeeded: number) => {
      if (context.yPos - spaceNeeded < context.marginBottom + 30) {
        // Draw footer before creating new page
        drawPageFooter();
        // Create new page and draw header
        addNewPage();
        drawPageHeader();
      }
    };

    // Helper function: draw page header
    const drawPageHeader = () => {
      context.yPos = context.pageHeight - context.marginTop;
      
      // Header background bar
      drawRect(context.contentStart - 10, context.yPos - 130, context.contentWidth + 20, 130, context.colors.lightGreen);
      
      // Draw logo image - left aligned
      if (context.logoImage && context.page) {
        try {
          const logoWidth = 240;
          const logoHeight = 100;
          context.page.drawImage(context.logoImage, {
            x: context.contentStart,
            y: context.yPos - logoHeight - 8,
            width: logoWidth,
            height: logoHeight,
          });
        } catch (err) {
          console.warn('Could not draw logo image:', err);
          drawText('ScrapNinja', context.contentStart, context.yPos - 15, context.typography.companyName, context.colors.primaryGreen, { bold: true });
        }
      } else {
        drawText('ScrapNinja', context.contentStart, context.yPos - 15, context.typography.companyName, context.colors.primaryGreen, { bold: true });
      }
      
      // Right aligned header info
      const rightX = context.contentStart + context.contentWidth - 180;
      drawText('ESG Compliance Report', rightX, context.yPos - 25, context.typography.labelText, context.colors.primaryGreen, { bold: true });
      drawText('Date: ' + new Date().toISOString().split('T')[0], rightX, context.yPos - 40, context.typography.smallText, context.colors.darkText);
      drawText('www.goscrapninja.com', rightX, context.yPos - 53, context.typography.smallText, context.colors.lightText);
      
      // Divider
      drawLine(context.contentStart, context.yPos - 115, context.contentStart + context.contentWidth, context.yPos - 115, 2, context.colors.primaryGreen);
      
      context.yPos -= 155;
    };

    // Helper function: draw page footer
    const drawPageFooter = () => {
      if (!context.page) return;
      
      const footerBoxHeight = 35;
      const footerY = context.marginBottom;
      
      // Footer background box
      drawRect(context.contentStart, footerY - footerBoxHeight, context.contentWidth, footerBoxHeight, context.colors.footerBg);
      
      // Footer top line - company info
      drawText('ScrapNinja - Smart Scrap Collection Platform', context.contentStart + 5, footerY - 12, context.typography.tinyText, context.colors.white);
      drawText(`Page ${context.pdfDoc.getPageCount()}`, context.contentStart + context.contentWidth - 80, footerY - 12, context.typography.tinyText, context.colors.white);
      
      // Footer bottom line - contact details
      drawText('Email: info@goscrapninja.com | Phone: +971 4 XXX XXXX | Address: Dubai, UAE', context.contentStart + 5, footerY - 24, context.typography.tinyText, context.colors.white);
      drawText('Confidential - ESG Compliance Report', context.contentStart + context.contentWidth - 180, footerY - 24, context.typography.tinyText, context.colors.white);
    };

    // Create first page
    addNewPage();
    drawPageHeader();

    // ===== SECTION: REPORT METADATA =====
    checkPageBreak(80);
    drawText('REPORT METADATA', context.contentStart, context.yPos, context.typography.sectionTitle, context.colors.primaryGreen, { bold: true });
    context.yPos -= 18;
    drawLine(context.contentStart, context.yPos, context.contentStart + 150, context.yPos, 2, context.colors.primaryGreen);
    context.yPos -= 16;

    const reportMetadata = [
      { label: 'Report Number:', value: 'SN-' + Date.now().toString().slice(-8) },
      { label: 'Report Type:', value: 'ESG Regulatory Compliance Report' },
      { label: 'Generated Date:', value: new Date().toISOString().split('T')[0] },
      { label: 'Generated By:', value: 'ScrapNinja System' },
      { label: 'Report Version:', value: '1.0' },
      { label: 'Application:', value: 'ScrapNinja - Smart Scrap Collection Platform' },
    ];

    reportMetadata.forEach((item) => {
      drawText(item.label, context.contentStart, context.yPos, context.typography.bodyText, context.colors.darkText, { bold: true });
      drawText(item.value, context.contentStart + 150, context.yPos, context.typography.bodyText, context.colors.lightText);
      context.yPos -= 12;
    });

    context.yPos -= 10;

    // ===== SECTION: OVERALL ESG SCORE CARD =====
    checkPageBreak(120);
    drawText('OVERALL ESG SCORE', context.contentStart, context.yPos, context.typography.sectionTitle, context.colors.primaryGreen, { bold: true });
    context.yPos -= 18;
    drawLine(context.contentStart, context.yPos, context.contentStart + 150, context.yPos, 2, context.colors.primaryGreen);
    context.yPos -= 16;

    const scoreCardWidth = context.contentWidth;
    const scoreCardHeight = 70;
    const scoreCardX = context.contentStart;
    const scoreCardY = context.yPos - scoreCardHeight;

    drawRect(scoreCardX, scoreCardY, scoreCardWidth, scoreCardHeight, context.colors.lightGreen, context.colors.primaryGreen, 2);

    // Score display
    const scoreStr = Math.round(scores.overall).toString();
    const scoreWidth = getTextWidth(scoreStr, 36);
    const scoreCenterX = scoreCardX + (scoreCardWidth / 4) - scoreWidth / 2;
    drawText(scoreStr, scoreCenterX, scoreCardY + 35, 36, context.colors.primaryGreen, { bold: true });
    drawText('/100', scoreCenterX + scoreWidth + 5, scoreCardY + 40, context.typography.cardTitle, context.colors.primaryGreen, { bold: true });

    // Status badge
    const statusText = scores.overall >= 75 ? 'COMPLIANT' : scores.overall >= 50 ? 'PARTIAL' : 'NON-COMPLIANT';
    const statusColor = scores.overall >= 75 ? context.colors.primaryGreen : scores.overall >= 50 ? context.colors.accentBlue : context.colors.accentRed;
    drawText(statusText, scoreCardX + scoreCardWidth / 2 + 20, scoreCardY + 35, context.typography.cardTitle, statusColor, { bold: true });

    context.yPos = scoreCardY - 20;

    // ===== SECTION: ESG COMPONENT SCORES =====
    checkPageBreak(100);
    drawText('ESG COMPONENT SCORES', context.contentStart, context.yPos, context.typography.sectionTitle, context.colors.primaryGreen, { bold: true });
    context.yPos -= 18;
    drawLine(context.contentStart, context.yPos, context.contentStart + 200, context.yPos, 2, context.colors.primaryGreen);
    context.yPos -= 16;

    const componentCards = [
      { name: 'Environmental', score: scores.environmental, color: context.colors.primaryGreen },
      { name: 'Social', score: scores.social, color: context.colors.accentBlue },
      { name: 'Governance', score: scores.governance, color: context.colors.accentPurple },
    ];

    const cardWidth = (context.contentWidth - context.spacing.elementGap * 2) / 3;
    const cardHeight = 50;

    componentCards.forEach((comp, idx) => {
      const cardX = context.contentStart + idx * (cardWidth + context.spacing.elementGap);
      const cardY = context.yPos - cardHeight;

      drawRect(cardX, cardY, cardWidth, cardHeight, context.colors.white, comp.color, 1);

      const compScore = Math.round(comp.score).toString();
      const compScoreWidth = getTextWidth(compScore, context.typography.cardTitle);
      const compScoreCenterX = cardX + (cardWidth / 2 - compScoreWidth / 2);
      drawText(compScore, compScoreCenterX, cardY + 25, context.typography.cardTitle, comp.color, { bold: true });
      drawText(comp.name, cardX + 5, cardY + 8, context.typography.labelText, context.colors.darkText, { bold: true });
    });

    context.yPos -= cardHeight + 20;

    // ===== SECTION: SELECTED SCRAP DETAILS =====
    checkPageBreak(150);
    drawText('SELECTED SCRAP DETAILS', context.contentStart, context.yPos, context.typography.sectionTitle, context.colors.primaryGreen, { bold: true });
    context.yPos -= 18;
    drawLine(context.contentStart, context.yPos, context.contentStart + 250, context.yPos, 2, context.colors.primaryGreen);
    context.yPos -= 16;

    // Table headers
    const colWidths = [30, 80, 70, 60, 50, 60, 65];
    const headers = ['Sr', 'Item', 'Category', 'Qty', 'Unit', 'Weight', 'CO2 Saved'];
    const tableRowHeight = 14;

    // Draw header row
    let colX = context.contentStart;
    headers.forEach((header, idx) => {
      drawRect(colX, context.yPos - tableRowHeight, colWidths[idx], tableRowHeight, context.colors.primaryGreen);
      drawText(header, colX + 3, context.yPos - 10, context.typography.tinyText, context.colors.white, { bold: true });
      colX += colWidths[idx];
    });

    context.yPos -= tableRowHeight;

    // Draw data rows
    let totalWeight = 0;
    let totalCO2 = 0;

    cartItems.forEach((item, idx) => {
      if (context.yPos - tableRowHeight < context.marginBottom + 50) {
        checkPageBreak(tableRowHeight + 40);
        // Redraw headers
        colX = context.contentStart;
        headers.forEach((header) => {
          drawRect(colX, context.yPos - tableRowHeight, colWidths[headers.indexOf(header)], tableRowHeight, context.colors.primaryGreen);
          drawText(header, colX + 3, context.yPos - 10, context.typography.tinyText, context.colors.white, { bold: true });
          colX += colWidths[headers.indexOf(header)];
        });
        context.yPos -= tableRowHeight;
      }

      const itemWeight = (item.quantity || 1);
      totalWeight += itemWeight;
      const co2Saved = (itemWeight * 2.5).toFixed(2); // Estimate: 2.5kg CO2 per kg of scrap
      totalCO2 += parseFloat(co2Saved);

      const rowData = [
        (idx + 1).toString(),
        item.name.substring(0, 15),
        item.category?.name?.substring(0, 10) || 'N/A',
        (item.quantity || 1).toString(),
        item.unit || 'kg',
        itemWeight.toFixed(1),
        co2Saved,
      ];

      colX = context.contentStart;
      const bgColor = idx % 2 === 0 ? context.colors.white : context.colors.lightGreen;
      
      rowData.forEach((data, colIdx) => {
        drawRect(colX, context.yPos - tableRowHeight, colWidths[colIdx], tableRowHeight, bgColor, context.colors.borderColor, 0.5);
        drawText(data, colX + 3, context.yPos - 10, context.typography.tinyText, context.colors.darkText);
        colX += colWidths[colIdx];
      });

      context.yPos -= tableRowHeight;
    });

    // Total row
    colX = context.contentStart;
    const totalRow = ['', 'TOTAL', '', cartItems.length.toString(), '', totalWeight.toFixed(1), totalCO2.toFixed(2)];
    totalRow.forEach((data, colIdx) => {
      drawRect(colX, context.yPos - tableRowHeight, colWidths[colIdx], tableRowHeight, context.colors.primaryGreen);
      drawText(data, colX + 3, context.yPos - 10, context.typography.tinyText, context.colors.white, { bold: true });
      colX += colWidths[colIdx];
    });

    context.yPos -= tableRowHeight + 16;

    // ===== SECTION: ENVIRONMENTAL IMPACT SUMMARY =====
    checkPageBreak(120);
    drawText('ENVIRONMENTAL IMPACT SUMMARY', context.contentStart, context.yPos, context.typography.sectionTitle, context.colors.primaryGreen, { bold: true });
    context.yPos -= 18;
    drawLine(context.contentStart, context.yPos, context.contentStart + 280, context.yPos, 2, context.colors.primaryGreen);
    context.yPos -= 16;

    const impactMetrics = [
      { label: 'CO2 Prevented', value: metrics.carbonSaved, unit: 'kg CO2' },
      { label: 'Water Saved', value: metrics.waterSaved, unit: 'liters' },
      { label: 'Energy Saved', value: metrics.energySaved, unit: 'kWh' },
      { label: 'Waste Diverted', value: metrics.landfillWasteReduced, unit: 'kg' },
    ];

    const metricCardWidth = (context.contentWidth - context.spacing.elementGap) / 2;
    const metricCardHeight = 40;

    impactMetrics.forEach((metric, idx) => {
      const row = Math.floor(idx / 2);
      const col = idx % 2;

      const metricCardX = context.contentStart + col * (metricCardWidth + context.spacing.elementGap);
      const metricCardY = context.yPos - row * (metricCardHeight + context.spacing.elementGap) - metricCardHeight;

      drawRect(metricCardX, metricCardY, metricCardWidth, metricCardHeight, context.colors.lightGreen, context.colors.secondaryGreen, 1);

      const valueStr = String(metric.value);
      drawText(valueStr, metricCardX + 10, metricCardY + 20, context.typography.cardTitle, context.colors.primaryGreen, { bold: true });
      drawText(metric.label, metricCardX + 10, metricCardY + 8, context.typography.labelText, context.colors.darkText);
      drawText(metric.unit, metricCardX + metricCardWidth - 40, metricCardY + 8, context.typography.labelText, context.colors.lightText);
    });

    context.yPos -= 2 * (metricCardHeight + context.spacing.elementGap) + 20;

    // ===== SECTION: COMPLIANCE ASSESSMENT =====
    if (compliance) {
      checkPageBreak(80);
      drawText('COMPLIANCE ASSESSMENT', context.contentStart, context.yPos, context.typography.sectionTitle, context.colors.primaryGreen, { bold: true });
      context.yPos -= 18;
      drawLine(context.contentStart, context.yPos, context.contentStart + 230, context.yPos, 2, context.colors.primaryGreen);
      context.yPos -= 16;

      const complianceInfo = [
        { label: 'Compliance Status:', value: compliance.regulatoryStatus.toUpperCase() },
        { label: 'Risk Level:', value: compliance.riskLevel?.toUpperCase() || 'LOW' },
        { label: 'Audit Result:', value: compliance.auditResult || 'PENDING' },
        { label: 'Certificate Status:', value: compliance.certificateStatus || 'VALID' },
      ];

      complianceInfo.forEach((info) => {
        drawText(info.label, context.contentStart, context.yPos, context.typography.bodyText, context.colors.darkText, { bold: true });
        const statusColor = info.value.includes('COMPLIANT') || info.value === 'VALID' || info.value === 'LOW' ? context.colors.primaryGreen : context.colors.accentRed;
        drawText(info.value, context.contentStart + 180, context.yPos, context.typography.bodyText, statusColor, { bold: true });
        context.yPos -= 12;
      });

      context.yPos -= 10;
    }

    // ===== SECTION: ORGANIZATION DETAILS =====
    if (organizationInfo) {
      checkPageBreak(100);
      drawText('ORGANIZATION DETAILS', context.contentStart, context.yPos, context.typography.sectionTitle, context.colors.primaryGreen, { bold: true });
      context.yPos -= 18;
      drawLine(context.contentStart, context.yPos, context.contentStart + 230, context.yPos, 2, context.colors.primaryGreen);
      context.yPos -= 16;

      const orgDetails = [
        { label: 'Company Name:', value: organizationInfo.companyName },
        { label: 'Contact Person:', value: organizationInfo.contactPerson || 'N/A' },
        { label: 'Email:', value: organizationInfo.email },
        { label: 'Phone:', value: organizationInfo.phone },
        { label: 'Facility Address:', value: organizationInfo.facilityAddress },
        { label: 'Registration Number:', value: organizationInfo.businessRegistrationNumber || 'N/A' },
      ];

      orgDetails.forEach((detail) => {
        drawText(detail.label, context.contentStart, context.yPos, context.typography.bodyText, context.colors.darkText, { bold: true });
        drawText(detail.value, context.contentStart + 140, context.yPos, context.typography.bodyText, context.colors.lightText);
        context.yPos -= 12;
      });

      context.yPos -= 10;
    }

    // Draw footer on last page
    drawPageFooter();

    // ===== SAVE AND DOWNLOAD =====
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ScrapNinja_ESG_Report_${new Date().toISOString().split('T')[0]}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log('Comprehensive ESG Report PDF generated and downloaded successfully!');
  } catch (err) {
    console.error('Error generating PDF:', err);
    alert('Failed to generate PDF. Please try again.');
  }
};

